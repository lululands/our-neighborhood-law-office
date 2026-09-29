'use client';

import { useEffect, useState } from 'react';

type PublishedPost = { id: string; title: string; category: string; district: string; date: string };

export default function PublishedPosts() {
  const [posts, setPosts] = useState<PublishedPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/.netlify/functions/published-posts')
      .then(response => response.ok ? response.json() : { posts: [] })
      .then(data => setPosts(Array.isArray(data.posts) ? data.posts : []))
      .catch(() => setPosts([]))
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded || posts.length === 0) return null;

  return <section className="published-list" aria-label="관리자 발행 글">
    <p className="eyebrow">새로 발행된 안내</p>
    <div>{posts.map(post => <a key={post.id} href={'/posts/' + post.id}>
      <span>{post.district} · {post.category}</span>
      <strong>{post.title}</strong>
      <small>{post.date} · 새 글 보기 →</small>
    </a>)}</div>
  </section>;
}
