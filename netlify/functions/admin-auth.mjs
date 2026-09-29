import { createHmac, timingSafeEqual } from 'node:crypto';

const clear = 'admin_session=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict';
const valid = (cookie, password) => {
  const value = cookie.split(';').map(x => x.trim()).find(x => x.startsWith('admin_session='))?.slice(14);
  if (!value || !password) return false;
  const [expires, signature] = value.split('.');
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  const expected = createHmac('sha256', password).update(expires).digest('base64url');
  return signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
};

export default async (request) => {
  if (request.method === 'POST') return { statusCode: 200, headers: { 'Set-Cookie': clear, 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: true }) };
  const ok = valid(request.headers.get('cookie') || '', process.env.ADMIN_PASSWORD);
  return { statusCode: ok ? 200 : 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ok }) };
};