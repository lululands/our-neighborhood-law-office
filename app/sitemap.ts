import type { MetadataRoute } from 'next';
import { articles } from './content';
import { isIndexableArticle } from './indexing';

export const dynamic = 'force-static';

const origin = 'https://our-neighborhood-law-office.netlify.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${origin}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...articles.filter(isIndexableArticle).map((article) => ({
      url: `${origin}/posts/${article.id}/`,
      lastModified: new Date(article.date.replaceAll('.', '-')),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
