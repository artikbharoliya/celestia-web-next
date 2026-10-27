import { randomUUID } from 'node:crypto';
import { createInquiryStore } from '../../lib/sharepoint.js';

export const config = { maxDuration: 60 };

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 150;
const MAX_MESSAGE_LENGTH = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RECAPTCHA_ACTION = 'contact_form_submit';
const DEFAULT_RECAPTCHA_MIN_SCORE = 0.5;
const ALLOWED_OCCUPATIONS = new Set([
  'Architect',
  'Architects',
  'Contractor',
  'Construction contractors',
  'Installer',
  'Distributor',
  'Sales representative',
  'Civil Engineers',
  'Other',
]);
const REQUIRED_ENV_KEYS = [
  'MICROSOFT_TENANT_ID',
  'MICROSOFT_CLIENT_ID',
  'MICROSOFT_CLIENT_SECRET',
  'SHAREPOINT_SITE_ID',
  'SHAREPOINT_LIST_ID',
  'RECAPTCHA_SECRET_KEY',
];

function sanitize(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function validatePayload(body) {
  const name = sanitize(body?.name);
  const email = sanitize(body?.email);
  const occupation = sanitize(body?.occupation);
  const company = sanitize(body?.company);
  const message = sanitize(body?.message);
  const captchaToken = sanitize(body?.captchaToken);
  const website = sanitize(body?.website);

  if (website) {
    return { error: 'Invalid form submission.' };
  }

  if (!name || !email || !occupation || !company || !message || !captchaToken) {
    return { error: 'Please complete all required fields.' };
  }

  if (name.length > MAX_NAME_LENGTH) {
    return { error: 'Name is too long.' };
  }

  if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    return { error: 'Please provide a valid email address.' };
  }

  if (!ALLOWED_OCCUPATIONS.has(occupation)) {
    return { error: 'Please select a valid occupation.' };
  }

  if (company.length > MAX_COMPANY_LENGTH) {
    return { error: 'Employer / company is too long.' };
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return { error: 'Message is too long.' };
  }

  return { name, email, occupation, company, message, captchaToken };
}

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];

  if (typeof forwardedFor === 'string') {
    return forwardedFor.split(',')[0].trim();
  }

  if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
    return forwardedFor[0].trim();
  }

  return req.socket?.remoteAddress || '';
}

async function verifyRecaptcha(token, req) {
  const rawMinScore = process.env.RECAPTCHA_MIN_SCORE || String(DEFAULT_RECAPTCHA_MIN_SCORE);
  const parsedMinScore = Number(rawMinScore);
  const minScore = Number.isFinite(parsedMinScore) && parsedMinScore >= 0 && parsedMinScore <= 1
    ? parsedMinScore
    : DEFAULT_RECAPTCHA_MIN_SCORE;

  const body = new URLSearchParams({
    secret: process.env.RECAPTCHA_SECRET_KEY,
    response: token,
  });

  const clientIp = getClientIp(req);
  if (clientIp) {
    body.append('remoteip', clientIp);
  }

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    return { valid: false, score: null, action: null, errorCodes: [] };
  }

  const result = await response.json();
  const score = typeof result.score === 'number' ? result.score : null;
  const action = typeof result.action === 'string' ? result.action : null;
  const errorCodes = Array.isArray(result['error-codes']) ? result['error-codes'] : [];

  const isActionValid = action === RECAPTCHA_ACTION;
  const isScoreValid = score !== null && score >= minScore;
  const isSuccessful = Boolean(result.success) && isActionValid && isScoreValid;

  return {
    valid: isSuccessful,
    score,
    action,
    minScore,
    errorCodes,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const missingRequiredEnv = REQUIRED_ENV_KEYS.filter((key) => !process.env[key]);
  if (missingRequiredEnv.length > 0) {
    console.error('Missing required contact env vars:', missingRequiredEnv.join(', '));
    return res.status(500).json({ message: 'Service configuration error. Please try again later.' });
  }

  const validation = validatePayload(req.body);
  if (validation.error) {
    return res.status(400).json({ message: validation.error });
  }

  const { name, email, occupation, company, message, captchaToken } = validation;
  const inquiry = {
    name, email, occupation, company, message,
    reference: randomUUID(),
    submittedAt: new Date().toISOString(),
  };

  try {
    const recaptcha = await verifyRecaptcha(captchaToken, req);
    if (!recaptcha.valid) {
      console.warn('reCAPTCHA validation failed for contact submission', {
        action: recaptcha.action,
        score: recaptcha.score,
        minScore: recaptcha.minScore,
        errorCodes: recaptcha.errorCodes,
      });
      return res.status(400).json({ message: 'Captcha validation failed. Please try again.' });
    }

    const store = await createInquiryStore();
    await store.saveInquiry(inquiry);
  } catch (error) {
    console.error('Contact inquiry could not be saved', {
      reference: inquiry.reference,
      stage: error?.stage,
      status: error?.status,
      code: error?.code,
      requestId: error?.requestId,
    });
    return res.status(503).json({ message: 'Unable to save your inquiry right now. Please try again later.' });
  }

  return res.status(200).json({
    message: 'Your inquiry has been received. Thank you!',
    reference: inquiry.reference,
  });
}
