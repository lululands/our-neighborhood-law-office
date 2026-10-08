import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '../../content';
import { isIndexableArticle } from '../../indexing';
import QuickConsult from '../../quick-consult';
import SecuredLoanConsult from '../../secured-loan-consult';
import { recoveryDetails } from '../../recovery-content';

const divorceConsultUrl='https://replyalba.com/intros/_frm/index.php?code=C3Q8SJMSPK';
const rehabilitationUrl='https://chaemuhelp.co.kr/#consult';

function articleSeed(value:string){return [...value].reduce((total,char,index)=>total+char.charCodeAt(0)*(index+7),0)}
function rotate<T>(items:T[],start:number){return items.map((_,index)=>items[(start+index)%items.length])}

function localArticleDetail(a:(typeof articles)[number]){
  const seed=articleSeed(a.id+a.title);
  const district=`${a.region} ${a.district||''}`.trim();
  const neighborhoods=a.dongs?.length?rotate(a.dongs,seed%a.dongs.length).slice(0,3):[];
  const neighborhoodCopy=neighborhoods.length?`${neighborhoods.join('·')}처럼 같은 ${a.district} 안에서도 생활 여건과 자료 보관 방식은 다를 수 있습니다.`:`${district}에서 상담 자료를 준비할 때에는 현재 상황을 날짜 순서로 정리하는 것이 좋습니다.`;
  const isDivorce=a.category.includes('이혼');
  const isBankruptcy=a.category.includes('파산');
  const openings=isDivorce?[
    '혼인관계의 경과와 현재 협의 가능한 범위를 먼저 나누면 상담 쟁점이 선명해집니다.',
    '감정적인 주장과 객관적인 자료를 구분해 적어 두면 재산·양육 문제를 설명하기 수월합니다.',
    '별거 전후의 생활 변화, 재산 이동, 자녀 돌봄 상황을 한 번에 정리하기보다 시기별로 나눠 보세요.',
    '이혼 여부와 재산분할·양육비 문제는 확인할 자료가 서로 다르므로 항목별 준비가 필요합니다.',
    '상대방과 합의된 내용, 다투는 내용, 아직 확인하지 못한 내용을 세 칸으로 나눠 기록해 보세요.',
    '상담 전에는 결론을 미리 정하기보다 혼인 기간에 있었던 주요 사실을 빠짐없이 정리하는 편이 안전합니다.',
  ]:isBankruptcy?[
    '현재 갚기 어려운 이유와 소득·재산 변동 과정을 시간 순서로 정리하면 면책 상담의 출발점이 됩니다.',
    '채무 총액뿐 아니라 최근 대출, 재산 처분, 가족 간 금전 이동을 함께 확인해야 설명 누락을 줄일 수 있습니다.',
    '개인파산과 면책은 현재 재산과 소득, 채무가 생긴 경위를 함께 살피므로 자료의 일관성이 중요합니다.',
    '채권자별 잔액과 연체 시점, 보유 재산과 생활비를 같은 기준일로 맞춰 정리해 보세요.',
    '오래된 채무도 임의로 빼지 말고 확인 가능한 범위에서 목록에 포함해 상담 때 검토하는 것이 좋습니다.',
    '소득이 줄어든 시점과 그 뒤의 생활비 조달 방법을 기록하면 현재 지급 능력을 설명하는 데 도움이 됩니다.',
  ]:[
    '월 소득에서 필수 생활비를 제외한 금액과 채권자별 상환액을 비교하면 변제 가능성을 구체적으로 살필 수 있습니다.',
    '개인회생 상담은 채무액만 확인하는 절차가 아니므로 소득의 지속성과 부양 상황을 함께 정리해야 합니다.',
    '급여·사업·일용 소득처럼 수입 형태가 여러 가지라면 입금 자료와 근무 내역을 각각 모아 두세요.',
    '연체 전후의 대출 사용처와 월별 지출 변화를 기록하면 무리 없는 변제계획을 검토하기 수월합니다.',
    '채권자 이름, 원금, 이자, 보증 여부를 표로 만들면 빠진 채무가 없는지 확인하기 좋습니다.',
    '보유 재산의 현재 가치와 담보 채무를 따로 적어야 실제 재산 상태를 보다 정확히 설명할 수 있습니다.',
  ];
  const records=isDivorce?[
    '부동산·예금·보험·차량·퇴직금과 채무 자료',
    '자녀의 주거·교육·의료비와 실제 돌봄 기록',
    '혼인 전후 재산 취득 시점과 자금 출처',
    '별거·협의·분쟁 과정에서 주고받은 문서와 메시지',
    '가구별 월 소득과 고정지출을 확인할 수 있는 자료',
  ]:isBankruptcy?[
    '채권자별 채무 잔액과 최근 변동 내역',
    '예금·보험·차량·부동산과 임대차 관련 자료',
    '최근 소득과 필수 생활비를 확인할 수 있는 내역',
    '재산 처분·명의 변경·가족 간 송금 자료',
    '채무가 늘어난 시기와 사용처를 설명할 기록',
  ]:[
    '채권자별 원금·이자·보증 채무 목록',
    '급여명세·통장 입금·사업 매출 등 소득 자료',
    '주거비·의료비·교육비 등 필수지출 내역',
    '예금·보험·차량·부동산과 임대차 자료',
    '부양가족과 최근 채무 발생 경위를 확인할 기록',
  ];
  const cautions=[
    '기억에만 의존하지 말고 확인되지 않은 항목은 별도 표시해 상담 때 질문하세요.',
    '원본을 제출하기 전 사본이나 전자파일을 남기고, 기준일이 다른 자료는 날짜를 함께 적어 두세요.',
    '광고의 가능 여부만으로 결론을 내리지 말고 본인의 소득·재산·가족관계에 맞춰 확인하세요.',
    '최근 변동 내역을 숨기거나 임의로 제외하지 말고 사실관계를 그대로 정리하는 것이 중요합니다.',
    '같은 지역의 사례라도 결과가 같다고 볼 수 없으므로 절차와 필요 서류는 개별적으로 확인하세요.',
    '상담 전에 중요한 질문 세 가지를 적어 두면 제한된 시간 안에 필요한 내용을 확인하기 좋습니다.',
  ];
  return {
    intro:`${district}에서 ${a.category} 정보를 찾는다면 ${openings[seed%openings.length]} ${neighborhoodCopy}`,
    process:`먼저 ${records[seed%records.length]}부터 준비하고, 다음으로 ${records[(seed+2)%records.length]}을 확인하세요. 서로 다른 시기의 자료는 최신순이 아니라 사건이 진행된 순서로 배열하면 변화 과정을 설명하기 쉽습니다.`,
    local:`${neighborhoods.length?`${neighborhoods[0]}를 비롯한 ${a.district} 동 단위 검색으로 이 글을 찾았더라도`:district+'에서 정보를 찾았더라도'} 적용 절차와 준비 범위는 개인 상황에 따라 달라질 수 있습니다. ${cautions[(seed+1)%cautions.length]}`,
    checks:rotate(records,seed%records.length),
    caution:cautions[seed%cautions.length],
  };
}

export async function generateMetadata({params}:{params:Promise<{id:string}>}):Promise<Metadata>{
  const {id}=await params;const a=articles.find(x=>x.id===id);if(!a)return {};
  const url='https://our-neighborhood-law-office.netlify.app/posts/'+id+'/';
  const index=isIndexableArticle(a);
  return {title:a.title,description:a.excerpt,alternates:{canonical:url},robots:{index,follow:true},openGraph:{type:'article',title:a.title,description:a.excerpt,url,images:a.image?[{url:a.image,alt:a.title}]:[]}};
}

export function generateStaticParams(){return articles.map(a=>({id:a.id}))}

export default async function Post({params}:{params:Promise<{id:string}>}){
  const {id}=await params;const a=articles.find(x=>x.id===id);if(!a)return notFound();
  const isDivorce=a.category.includes('이혼');
  const isRecoveryEconomy=a.category==='회생경제';
  const recoveryDetail=isRecoveryEconomy?recoveryDetails[a.id]:undefined;
  const label=a.district?`${a.region} ${a.district} · `:'';
  const keyTitle=isRecoveryEconomy?'회생경제, 상환 계획부터 확인하세요':isDivorce?'이혼소송, 혼자 준비하지 마세요':'개인회생, 현재 상황부터 차분히 정리하세요';
  const keyCopy=isRecoveryEconomy?'생활 금융정보 · 기존 대출 · 상환 부담을 확인합니다':isDivorce?'재산분할 · 양육비 · 양육권 쟁점을 확인합니다':'소득 · 채무 · 재산 · 준비 서류를 확인합니다';
  const dongKeyword=isDivorce?'이혼전문변호사 · 이혼소송변호사':'개인회생 · 개인회생상담';
  const issues=isDivorce?'재산분할 · 양육비 · 양육권':'채무 · 소득 · 재산 · 변제계획';
  const consultUrl=isDivorce?divorceConsultUrl:rehabilitationUrl;
  const consultText=isDivorce?'이혼 상담 폼 바로가기':'개인회생 상담 폼 바로가기';
  const localDetail=a.dongs?localArticleDetail(a):undefined;
  return <main>
    <header className="site-header"><Link className="brand" href="/"><span className="brand-town"><img src="/images/town-tile-roof.svg" alt="" aria-hidden="true"/>우리동네</span><span>법률사무소</span></Link><Link href="/articles">전체 글</Link></header>
    {!isRecoveryEconomy&&<QuickConsult />}
    <article className="post">
      <p className="breadcrumbs">홈 / {a.region} / {a.category}</p>
      <p className="eyebrow">{label}{a.category}</p>
      <h1>{a.title}</h1>
      <p className="post-meta">발행일 {a.date} · 우리동네 법률사무소</p>
      {!isRecoveryEconomy&&<section className={`article-consult ${isDivorce?'article-consult-divorce':'article-consult-rehab'}`}>
        <div className="article-consult-copy"><p>빠른 상담 신청</p><strong>{isDivorce?'이혼·재산분할 상담을 바로 준비하세요.':'개인회생·개인파산 상담을 바로 준비하세요.'}</strong><span>{isDivorce?'재산분할·양육비·양육권 자료를 정리해 상담 폼에서 신청할 수 있습니다.':'채무·소득·재산·부양가족 정보를 정리해 상담 폼에서 신청할 수 있습니다.'}</span></div>
        <div className="article-consult-fields"><a href={consultUrl} target="_blank" rel="noopener noreferrer">{isDivorce?'비대면·비밀 무료상담':'비대면 채무 무료상담'}</a></div>
      </section>}
      {isRecoveryEconomy&&<SecuredLoanConsult />}
      {a.image&&<section className="post-hero"><img src={a.image} alt={a.title+' 대표 이미지'}/><div><p>{a.region} {a.district||''} {a.category}</p><strong>{keyTitle}</strong><span>{keyCopy}</span><b>지역별 법률정보</b></div></section>}
      {localDetail?<div className="post-content local-detail">
        <p>{localDetail.intro}</p>
        <h2>{a.region} {a.district} 상담 전 자료 정리 순서</h2>
        <p>{localDetail.process}</p>
        <ul>{localDetail.checks.map(check=><li key={check}>{check}</li>)}</ul>
        <h2>{a.district} 동 단위 정보를 볼 때 주의할 점</h2>
        <p>{localDetail.local}</p>
        <p><strong>마지막 확인:</strong> {localDetail.caution}</p>
      </div>:<div className="post-content">{a.body.split('\n\n').map((p,i)=><p key={i}>{p}</p>)}</div>}
      {recoveryDetail&&<section className="recovery-detail">
        <h2>{recoveryDetail.heading}</h2>
        <p>{recoveryDetail.summary}</p>
        <h3>상담 전에 확인할 항목</h3>
        <ul>{recoveryDetail.checks.map(check=><li key={check}>{check}</li>)}</ul>
        <p><strong>주의할 점</strong> {recoveryDetail.caution}</p>
      </section>}
      {a.dongs&&<section className="dong-guide"><h2>{a.region} {a.district} 동 단위 {a.category} 안내</h2><p>동 이름과 함께 {dongKeyword} 키워드를 확인할 수 있습니다.</p><div className="dong-table-wrap"><table><thead><tr><th>동 단위</th><th>{a.category} 키워드</th><th>주요 확인 쟁점</th></tr></thead><tbody>{a.dongs.map(d=><tr key={d}><th>{d}</th><td>{d} {dongKeyword}</td><td>{issues}</td></tr>)}</tbody></table></div></section>}
      {!isRecoveryEconomy&&<section className="publish-panel"><strong>{isDivorce?'이혼 상담이 필요하신가요?':'개인회생 상담이 필요하신가요?'}</strong><p>구체적인 법률 판단과 절차는 개별 사실관계를 바탕으로 확인해야 합니다.</p><a className="primary" href={consultUrl} target="_blank" rel="noopener noreferrer">{consultText}</a></section>}
      {a.tags&&<div className="article-tags">{a.tags.map(tag=><span key={tag}>#{tag}</span>)}</div>}
    </article>
  </main>;
}
