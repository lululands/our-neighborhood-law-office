import { getStore } from '@netlify/blobs';

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=30' }
});

export default async request => {
  if (request.method !== 'GET') return json({ ok: false }, 405);

  try {
    const store = getStore('law-office-posts');
    const { blobs } = await store.list({ prefix: 'post/' });
    const records = await Promise.all(blobs.slice(-40).map(async ({ key }) => {
      const post = await store.get(key, { type: 'json', consistency: 'strong' });
      return post ? {
        id: String(post.id),
        title: String(post.title || ''),
        category: String(post.category || ''),
        district: String(post.district || ''),
        date: String(post.date || '')
      } : null;
    }));
    const posts = records.filter(Boolean).sort((a, b) => Number(b.id) - Number(a.id)).slice(0, 12);
    return json({ ok: true, posts });
  } catch (error) {
    console.error(error);
    return json({ ok: false, posts: [] }, 500);
  }
};
