const REQUEST_TIMEOUT_MS = 8000;

function requestError(stage, response, result) {
  const error = new Error(`${stage} failed.`);
  error.stage = stage;
  error.status = response?.status;
  error.requestId = response?.headers.get('request-id');
  const code = result?.error?.code || result?.error;
  // Never include Microsoft's full response, access tokens, or inquiry data.
  error.code = typeof code === 'string' && /^[\w.-]{1,100}$/.test(code) ? code : undefined;
  return error;
}

async function requestJson(url, options, stage) {
  let response;
  let result;

  try {
    response = await fetch(url, {
      ...options,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    result = await response.json();
  } catch {
    throw requestError(stage, response);
  }

  if (!response.ok) throw requestError(stage, response, result);
  return result;
}

// Called only by the server-side contact API, after input and CAPTCHA validation.
export async function createInquiryStore() {
  const token = await requestJson(
    `https://login.microsoftonline.com/${encodeURIComponent(process.env.MICROSOFT_TENANT_ID)}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.MICROSOFT_CLIENT_ID,
        client_secret: process.env.MICROSOFT_CLIENT_SECRET,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials',
      }).toString(),
    },
    'Microsoft authentication',
  );

  if (typeof token?.access_token !== 'string' || !token.access_token) {
    throw requestError('Microsoft authentication');
  }

  const itemsUrl = `https://graph.microsoft.com/v1.0/sites/${encodeURIComponent(process.env.SHAREPOINT_SITE_ID)}/lists/${encodeURIComponent(process.env.SHAREPOINT_LIST_ID)}/items`;
  const headers = {
    Authorization: `Bearer ${token.access_token}`,
    'Content-Type': 'application/json',
  };

  return {
    async saveInquiry({ name, email, occupation, company, message, reference, submittedAt }) {
      const result = await requestJson(itemsUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          fields: {
            // Rename the built-in Title header to "name" in Lists. Its internal
            // API name stays Title; all custom columns match our field keys.
            Title: name,
            email,
            occupation,
            company,
            message,
            reference,
            submittedAt,
            status: 'New',
          },
        }),
      }, 'SharePoint inquiry save');

      if (typeof result?.id !== 'string' || !result.id) {
        throw requestError('SharePoint inquiry save');
      }
      return result.id;
    },
  };
}
