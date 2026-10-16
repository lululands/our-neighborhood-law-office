import type { Metadata } from 'next';
import Link from 'next/link';
import { articles, categories } from '../../content';
import { isIndexableArticle } from '../../indexing';
import QuickConsult from '../../quick-consult';

const origin='https://dongnelaw-guide.netlify.app';

export function generateStaticParams(){return categories.map(({slug})=>({slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const category=categories.find(item=>item.slug===slug);
  if(!category)return {robots:{index:false,follow:true}};
  const title=`${category.name} 지역별 안내`;
  const description=`${category.name} 상담 전 확인할 절차와 준비 자료를 서울·경기·인천 지역별로 정리했습니다.`;
  const url=`${origin}/category/${slug}`;
  return {title,description,alternates:{canonical:url},robots:{index:true,follow:true},openGraph:{type:'website',title,description,url}};
}

export default async function CategoryPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const category=categories.find(item=>item.slug===slug);
  if(!category)return <main className="post"><h1>찾을 수 없는 분야입니다.</h1><Link href="/">홈으로 돌아가기</Link></main>;
  const matched=articles.filter(article=>article.category===category.name&&isIndexableArticle(article));
  return <main className="listing">
    <Link className="breadcrumbs" href="/">홈</Link>
    <p className="eyebrow">LEGAL TOPIC</p>
    <h1>{category.name}</h1>
    <p>{category.slug==='recovery-economy'?'상환 부담과 계약 조건을 확인하는 생활 금융정보를 확인하세요.':category.description+'에 관한 지역별 생활 법률 정보를 확인하세요.'}</p>
    {category.slug!=='recovery-economy'&&<QuickConsult />}
    <div className="article-list">{matched.length?matched.map(article=><Link className="article-row" href={`/posts/${article.id}`} key={article.id}><div><p>{article.region} · {article.category}</p><h3>{article.title}</h3></div><b>→</b></Link>):<p className="empty">준비 중인 안내입니다.</p>}</div>
  </main>;
}
