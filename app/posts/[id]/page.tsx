import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '../../content';
import QuickConsult from '../../quick-consult';

const divorceConsultUrl='https://replyalba.com/intros/_frm/index.php?code=C3Q8SJMSPK';
const rehabilitationUrl='https://chaemuhelp.co.kr/#consult';

export async function generateMetadata({params}:{params:Promise<{id:string}>}):Promise<Metadata>{
  const {id}=await params;const a=articles.find(x=>x.id===id);if(!a)return {};
  const url='https://our-neighborhood-law-office.netlify.app/posts/'+id;
  return {title:a.title,description:a.excerpt,alternates:{canonical:url},openGraph:{type:'article',title:a.title,description:a.excerpt,url,images:a.image?[{url:a.image,alt:a.title}]:[]}};
}

export function generateStaticParams(){return articles.map(a=>({id:a.id}))}

export default async function Post({params}:{params:Promise<{id:string}>}){
  const {id}=await params;const a=articles.find(x=>x.id===id);if(!a)return notFound();
  const isDivorce=a.category.includes('이혼');
  const label=a.district?`${a.region} ${a.district} · `:'';
  const keyTitle=isDivorce?'이혼소송, 혼자 준비하지 마세요':'개인회생, 현재 상황부터 차분히 정리하세요';
  const keyCopy=isDivorce?'재산분할 · 양육비 · 양육권 쟁점을 확인합니다':'소득 · 채무 · 재산 · 준비 서류를 확인합니다';
  const dongKeyword=isDivorce?'이혼전문변호사 · 이혼소송변호사':'개인회생 · 개인회생상담';
  const issues=isDivorce?'재산분할 · 양육비 · 양육권':'채무 · 소득 · 재산 · 변제계획';
  const consultUrl=isDivorce?divorceConsultUrl:rehabilitationUrl;
  const consultText=isDivorce?'이혼 상담 폼 바로가기':'개인회생 상담 폼 바로가기';
  return <main>
    <header className="site-header"><Link className="brand" href="/"><span>우리동네</span> 법률사무소</Link><Link href="/articles">전체 글</Link></header>
    <QuickConsult />
    <article className="post">
      <p className="breadcrumbs">홈 / {a.region} / {a.category}</p>
      <p className="eyebrow">{label}{a.category}</p>
      <h1>{a.title}</h1>
      <p className="post-meta">발행일 {a.date} · 우리동네 법률사무소</p>
      <section className={`article-consult ${isDivorce?'article-consult-divorce':'article-consult-rehab'}`}>
        <div className="article-consult-copy"><p>빠른 상담 신청</p><strong>{isDivorce?'이혼·재산분할 상담을 바로 준비하세요.':'개인회생·개인파산 상담을 바로 준비하세요.'}</strong><span>{isDivorce?'재산분할·양육비·양육권 자료를 정리해 상담 폼에서 신청할 수 있습니다.':'채무·소득·재산·부양가족 정보를 정리해 상담 폼에서 신청할 수 있습니다.'}</span></div>
        <div className="article-consult-fields"><a href={consultUrl} target="_blank" rel="noopener noreferrer">{isDivorce?'비대면·비밀 무료상담':'비대면 채무 무료상담'}</a></div>
      </section>
      {a.image&&<section className="post-hero"><img src={a.image} alt={a.title+' 대표 이미지'}/><div><p>{a.region} {a.district||''} {a.category}</p><strong>{keyTitle}</strong><span>{keyCopy}</span><b>지역별 법률정보</b></div></section>}
      {a.tags&&<div className="article-tags">{a.tags.map(tag=><span key={tag}>#{tag}</span>)}</div>}
      <div className="post-content">{a.body.split('\n\n').map((p,i)=><p key={i}>{p}</p>)}</div>
      {a.dongs&&<section className="dong-guide"><h2>{a.region} {a.district} 동 단위 {a.category} 안내</h2><p>동 이름과 함께 {dongKeyword} 키워드를 확인할 수 있습니다.</p><div className="dong-table-wrap"><table><thead><tr><th>동 단위</th><th>{a.category} 키워드</th><th>주요 확인 쟁점</th></tr></thead><tbody>{a.dongs.map(d=><tr key={d}><th>{d}</th><td>{d} {dongKeyword}</td><td>{issues}</td></tr>)}</tbody></table></div></section>}
      <section className="publish-panel"><strong>{isDivorce?'이혼 상담이 필요하신가요?':'개인회생 상담이 필요하신가요?'}</strong><p>구체적인 법률 판단과 절차는 개별 사실관계를 바탕으로 확인해야 합니다.</p><a className="primary" href={consultUrl} target="_blank" rel="noopener noreferrer">{consultText}</a></section>
    </article>
  </main>;
}
