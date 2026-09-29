import { createHmac, timingSafeEqual } from 'node:crypto';

const unauthorized = () => ({ statusCode: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: false }) });
const same = (a, b) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

export default async (request) => {
  if (request.method !== 'POST') return { statusCode: 405, body: '' };
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return { statusCode: 503, body: JSON.stringify({ ok: false, message: '관리자 로그인 설정 중입니다.' }) };
  let supplied = '';
  try { supplied = JSON.parse(request.body || '{}').password || ''; } catch {}
  if (!same(supplied, expected)) return unauthorized();

  const expires = Date.now() + 1000 * 60 * 60 * 12;
  const signature = createHmac('sha256', expected).update(String(expires)).digest('base64url');
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `admin_session=${expires}.${signature}; Path=/; Max-Age=43200; HttpOnly; Secure; SameSite=Strict`
    },
    body: JSON.stringify({ ok: true })
  };
};