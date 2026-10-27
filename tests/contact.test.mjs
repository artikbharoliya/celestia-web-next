import assert from 'node:assert/strict';
import { afterEach, beforeEach, mock, test } from 'node:test';
import handler from '../src/pages/api/contact.js';

const testEnv = {
  MICROSOFT_TENANT_ID: 'test-tenant',
  MICROSOFT_CLIENT_ID: 'test-client',
  MICROSOFT_CLIENT_SECRET: 'test-secret',
  SHAREPOINT_SITE_ID: 'example.sharepoint.com,site-id,web-id',
  SHAREPOINT_LIST_ID: 'test-list',
  RECAPTCHA_SECRET_KEY: 'test-captcha-secret',
  RECAPTCHA_MIN_SCORE: '0.5',
};
const originalEnv = Object.fromEntries(Object.keys(testEnv).map((key) => [key, process.env[key]]));
const validBody = {
  name: ' Alex Customer ',
  email: ' alex@example.com ',
  occupation: 'Architect',
  company: ' Example Studio ',
  message: ' Please tell me about your products. ',
  captchaToken: 'test-captcha-token',
  website: '',
};
let events;
let savedFields;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'request-id': 'test-request-id' },
  });
}

function stubServices({ captcha, tokenStatus, saveStatus, networkFailure, malformedSave, tokenBody, itemBody } = {}) {
  mock.method(globalThis, 'fetch', async (url, options) => {
    assert.ok(options.signal instanceof AbortSignal);
    if (url === 'https://www.google.com/recaptcha/api/siteverify') {
      events.push('captcha');
      return json(captcha || { success: true, action: 'contact_form_submit', score: 0.9 });
    }
    if (url === 'https://login.microsoftonline.com/test-tenant/oauth2/v2.0/token') {
      events.push('authenticate');
      const params = new URLSearchParams(options.body);
      assert.equal(params.get('scope'), 'https://graph.microsoft.com/.default');
      assert.equal(params.get('grant_type'), 'client_credentials');
      assert.equal(params.get('client_id'), testEnv.MICROSOFT_CLIENT_ID);
      assert.equal(params.get('client_secret'), testEnv.MICROSOFT_CLIENT_SECRET);
      return tokenStatus
        ? json({ error: 'invalid_client', error_description: 'private authentication details' }, tokenStatus)
        : json(tokenBody === undefined ? { access_token: 'test-access-token' } : tokenBody);
    }

    const itemsUrl = `https://graph.microsoft.com/v1.0/sites/${encodeURIComponent(testEnv.SHAREPOINT_SITE_ID)}/lists/test-list/items`;
    assert.equal(options.headers.Authorization, 'Bearer test-access-token');
    if (url === itemsUrl && options.method === 'POST') {
      events.push('save');
      savedFields = JSON.parse(options.body).fields;
      if (networkFailure) throw new Error('private network details');
      if (malformedSave) return new Response('not JSON');
      return saveStatus
        ? json({ error: { code: 'accessDenied', message: 'private SharePoint details' } }, saveStatus)
        : json(itemBody === undefined ? { id: '42' } : itemBody, 201);
    }
    assert.fail(`Unexpected request: ${options.method} ${url}`);
  });
}

async function submit(body = validBody, method = 'POST') {
  const res = {
    statusCode: 200,
    headers: {},
    setHeader(key, value) { this.headers[key] = value; },
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; },
  };
  await handler({ method, body, headers: {}, socket: {} }, res);
  return res;
}

beforeEach(() => {
  Object.assign(process.env, testEnv);
  events = [];
  savedFields = undefined;
  mock.method(console, 'error', () => {});
  mock.method(globalThis, 'fetch', async () => { throw new Error('Unexpected network request'); });
});

afterEach(() => {
  mock.restoreAll();
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

test('confirms success after saving the complete inquiry with no further service requests', async () => {
  stubServices();
  const res = await submit();
  assert.equal(res.statusCode, 200);
  assert.deepEqual(events, ['captcha', 'authenticate', 'save']);
  assert.deepEqual(savedFields, {
    Title: 'Alex Customer',
    email: 'alex@example.com',
    occupation: 'Architect',
    company: 'Example Studio',
    message: 'Please tell me about your products.',
    reference: res.body.reference,
    submittedAt: savedFields.submittedAt,
    status: 'New',
  });
  assert.match(res.body.reference, /^[0-9a-f-]{36}$/);
  assert.ok(Number.isFinite(Date.parse(savedFields.submittedAt)));
  assert.equal(res.body.message, 'Your inquiry has been received. Thank you!');
});

for (const failure of [
  { tokenStatus: 401 },
  { tokenBody: {} },
  { tokenBody: null },
  { saveStatus: 403 },
  { saveStatus: 429 },
  { networkFailure: true },
  { malformedSave: true },
  { itemBody: {} },
]) {
  test(`requires a confirmed save before success: ${JSON.stringify(failure)}`, async () => {
    stubServices(failure);
    const res = await submit();
    assert.equal(res.statusCode, 503);
    assert.equal(res.body.reference, undefined);
    const authenticationFailed = failure.tokenStatus || failure.tokenBody !== undefined;
    assert.deepEqual(events, authenticationFailed
      ? ['captcha', 'authenticate']
      : ['captcha', 'authenticate', 'save']);
    const diagnostics = JSON.stringify([res.body, console.error.mock.calls]);
    for (const value of ['private', testEnv.MICROSOFT_CLIENT_SECRET, 'test-access-token', validBody.email.trim()]) {
      assert.equal(diagnostics.includes(value), false);
    }
  });
}

for (const captcha of [
  { success: false },
  { success: true, action: 'other_action', score: 0.9 },
  { success: true, action: 'contact_form_submit', score: 0.1 },
]) {
  test(`rejects invalid captcha before Microsoft calls: ${JSON.stringify(captcha)}`, async () => {
    stubServices({ captcha });
    const res = await submit();
    assert.equal(res.statusCode, 400);
    assert.deepEqual(events, ['captcha']);
  });
}

test('rejects invalid input and honeypot submissions before network requests', async () => {
  stubServices();
  for (const body of [
    { ...validBody, website: 'spam.example.com' },
    { ...validBody, email: 'invalid' },
    { ...validBody, occupation: 'invalid' },
    { ...validBody, message: 'x'.repeat(2001) },
    { ...validBody, company: '' },
  ]) {
    assert.equal((await submit(body)).statusCode, 400);
  }
  assert.deepEqual(events, []);
});

test('fails closed without Microsoft configuration', async () => {
  stubServices();
  delete process.env.MICROSOFT_CLIENT_SECRET;
  assert.equal((await submit()).statusCode, 500);
  assert.deepEqual(events, []);
});

test('rejects non-POST requests', async () => {
  const res = await submit(undefined, 'GET');
  assert.equal(res.statusCode, 405);
  assert.deepEqual(res.headers.Allow, ['POST']);
});
