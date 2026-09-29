import { createHmac, timingSafeEqual } from 'node:crypto';

const json = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json', ...headers }
});
const same = (a, b) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

export default async (request) => {
  if (request.method !== 'POST') return json({}, 405);
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return json({ ok: false, message: '관리자 로그인 설정 중입니다.' }, 503);

  let supplied = '';
  try { supplied = (await request.json()).password || ''; } catch {}
  if (!same(supplied, expected)) return json({ ok: false }, 401);

  const expires = Date.now() + 1000 * 60 * 60 * 12;
  const signature = createHmac('sha256', expected).update(String(expires)).digest('base64url');
  return json({ ok: true }, 200, {
    'Set-Cookie': `admin_session=${expires}.${signature}; Path=/; Max-Age=43200; HttpOnly; Secure; SameSite=Strict`
  });
};