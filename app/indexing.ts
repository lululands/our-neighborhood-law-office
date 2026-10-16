import type { Article } from './content';

export function isIndexableArticle(article: Article & {indexable?: boolean}) {
  if (article.indexable === false) return false;

  return /^\d+$/.test(article.id)
    || article.id.startsWith('recovery-economy-')
    || /^(rehab|bankruptcy|divorce)-/.test(article.id);
}

