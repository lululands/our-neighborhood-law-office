import type { Metadata } from 'next';
import Link from 'next/link';
import { articles, categories, regions } from '../../content';
import { isIndexableArticle } from '../../indexing';
import QuickConsult from '../../quick-consult';

const origin='https://our-neighborhood-law-office.netlify.app';

export function generateStaticParams(){return regions.map(({slug})=>({slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const region=regions.find(item=>item.slug===slug);
  if(!region)return {robots:{index:false,follow:true}};
  const title=`${region.name} 개인회생·개인파산·이혼전문변호사 안내`;
  const description=`${region.name} 지역의 개인회생, 개인파산, 이혼전문변호사 상담 전 확인할 절차와 준비 자료를 안내합니다.`;
  const url=`${origin}/region/${slug}`;
  return {title,description,alternates:{canonical:url},robots:{index:true,follow:true},openGraph:{type:'website',title,description,url}};
}

export default async function RegionPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const region=regions.find(item=>item.slug===slug);
  if(!region)return <main className="post"><h1>찾을 수 없는 지역입니다.</h1><Link href="/">홈으로 돌아가기</Link></main>;
  const matched=articles.filter(article=>article.region===region.name&&isIndexableArticle(article));
  const availableCategories=categories.filter(category=>matched.some(article=>article.category===category.name));
  return <main className="listing">
    <Link className="breadcrumbs" href="/">홈</Link>
    <p className="eyebrow">LOCAL GUIDE</p>
    <h1>{region.name} 법률 정보</h1>
    <p>{region.name} 지역의 개인회생·개인파산·이혼전문변호사 정보를 실제 발행글로 확인하세요.</p>
    <QuickConsult />
    <div className="topic-grid">{availableCategories.map((category,index)=><Link className={`topic-card topic-${index%4}`} href={`/category/${category.slug}`} key={category.slug}><h3>{region.name} {category.name}</h3><p>분야별 안내 보기</p><span className="round-arrow">↗</span></Link>)}</div>
    <div className="latest-head"><div><p className="eyebrow">지역별 발행글</p><h2>{region.name} 주요 법률 안내</h2></div></div>
    <div className="article-list">{matched.map(article=><Link className="article-row" href={`/posts/${article.id}`} key={article.id}><div><p>{article.district||article.region} · {article.category}</p><h3>{article.title}</h3></div><b>→</b></Link>)}</div>
  </main>;
}
