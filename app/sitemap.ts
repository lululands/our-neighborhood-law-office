import type { MetadataRoute } from 'next';
import { articles, categories } from './content';
import { isIndexableArticle } from './indexing';

export const dynamic='force-static';

const origin='https://dongnelaw-guide.netlify.app';
const siteUpdated=new Date('2026-10-16T00:00:00+09:00');

export default function sitemap():MetadataRoute.Sitemap{
  const staticPages=['','articles','about','privacy'].map(path=>({
    url:path?`${origin}/${path}`:`${origin}/`,
    lastModified:siteUpdated,
    changeFrequency:'weekly' as const,
    priority:path?0.7:1
  }));
  const categoryPages=categories.map(category=>({
    url:`${origin}/category/${category.slug}`,
    lastModified:siteUpdated,
    changeFrequency:'weekly' as const,
    priority:0.8
  }));
  const articlePages=articles.filter(isIndexableArticle).map(article=>({
    url:`${origin}/posts/${article.id}`,
    lastModified:new Date(article.date.replaceAll('.', '-')+'T00:00:00+09:00'),
    changeFrequency:'monthly' as const,
    priority:0.8
  }));
  return [...staticPages,...categoryPages,...articlePages];
}
