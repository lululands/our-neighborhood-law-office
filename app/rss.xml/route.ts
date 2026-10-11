import { articles } from '../content';
import { isIndexableArticle } from '../indexing';

export const dynamic='force-static';

const origin='https://our-neighborhood-law-office.netlify.app';
const xmlText=(value:string)=>value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'","&apos;");
const cdata=(value:string)=>value.replaceAll(']]>',']]]]><![CDATA[>');

export function GET(){
  const indexedArticles=articles.filter(isIndexableArticle);
  const items=indexedArticles.map(article=>{
    const url=`${origin}/posts/${article.id}`;
    return `<item><title>${xmlText(article.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description><![CDATA[${cdata(article.excerpt)}]]></description><content:encoded><![CDATA[${cdata(article.body)}]]></content:encoded><pubDate>${new Date(article.date.replaceAll('.', '-')+'T00:00:00+09:00').toUTCString()}</pubDate></item>`;
  }).join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/"><channel><title>우리동네 법률사무소</title><link>${origin}/</link><description>지역별 생활 법률 정보</description><language>ko-KR</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}</channel></rss>`,
    {headers:{'Content-Type':'application/rss+xml; charset=utf-8'}}
  );
}
