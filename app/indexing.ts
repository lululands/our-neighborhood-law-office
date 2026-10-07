import type { Article } from './content';

export function isIndexableArticle(article: Article) {
  return /^\d+$/.test(article.id) || article.id.startsWith('recovery-economy-');
}
