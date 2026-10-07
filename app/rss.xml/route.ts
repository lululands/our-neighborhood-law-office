import { articles } from '../content';

export const dynamic = 'force-static';

const origin = 'https://our-neighborhood-law-office.netlify.app';

export function GET() {
  const items = articles
    .map(
      (article) =>
        `<item><title><![CDATA[${article.title}]]></title><link>${origin}/posts/${article.id}/</link><description><![CDATA[${article.excerpt}]]></description><pubDate>${new Date(article.date.replaceAll('.', '-')).toUTCString()}</pubDate></item>`,
    )
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>우리동네 법률사무소</title><link>${origin}/</link><description>지역별 생활 법률 정보</description>${items}</channel></rss>`,
    { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } },
  );
}
