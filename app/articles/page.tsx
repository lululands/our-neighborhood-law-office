import type { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '../content';
import { isIndexableArticle } from '../indexing';

const origin='https://dongnelaw-guide.netlify.app';

export const metadata:Metadata={
  title:'전체 지역별 법률 정보',
  description:'개인회생, 개인파산, 이혼전문변호사와 생활 법률 정보를 지역별로 모아 확인하세요.',
  alternates:{canonical:`${origin}/articles`},
  robots:{index:true,follow:true},
  openGraph:{type:'website',title:'전체 지역별 법률 정보',description:'지역별 생활 법률 정보를 분야별로 확인하세요.',url:`${origin}/articles`}
};

export default function ArticlesPage(){
  const indexedArticles=articles.filter(isIndexableArticle);
  return <main className="listing"><Link className="breadcrumbs" href="/"><span>홈</span></Link><p className="eyebrow">RECENT ARTICLES</p><h1>전체 법률 정보</h1><div className="article-list">{indexedArticles.map(article=><Link className="article-row" href={`/posts/${article.id}`} key={article.id}><div><p>{article.region} · {article.category}</p><h3>{article.title}</h3></div><b>→</b></Link>)}</div></main>;
}
