import type { Article } from './content';

const primaryArticleIds = new Set([
  '101',
  '102',
  '103',
  'rehab-seoul-gangseo',
  'bankruptcy-seoul-gangseo',
  'divorce-seoul-gangnam',
  'recovery-economy-checklist',
  'recovery-economy-prepare',
  'recovery-economy-finance-16',
  'recovery-economy-finance-17'
]);

export function isIndexableArticle(article: Article & {indexable?: boolean}) {
  if (article.indexable === false) return false;

  return primaryArticleIds.has(article.id);
}
