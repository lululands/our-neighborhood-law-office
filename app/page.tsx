import Link from 'next/link';
import { articles, categories, regions, seoulDistricts } from './content';
import { DebtConsultButton } from './debt-consult';
import PublishedPosts from './published-posts';

const rehabilitationUrl='https://chaemuhelp.co.kr';
const divorceInfoUrl='https://replyalba.com/pt/C3Q8SJMSPK';
const divorceConsultUrl='https://replyalba.com/intros/_frm/index.php?code=C3Q8SJMSPK';

export default function Home() {
  const featured = articles[0];
  return <main>
    <header className="site-header"><Link className="brand" href="/"><span>우리동네</span> 법률사무소</Link><nav><a href="#topics">법률정보</a><a href="#regions">지역별 안내</a><Link href="/admin">글 발행</Link></nav><a className="header-cta" href="#consult">상담 바로하기</a></header>
    <section className="hero"><p className="eyebrow">생활 가까이에서 만나는 법률 길잡이</p><h1>복잡한 법률 문제,<br/><em>우리 동네 기준으로</em> 정리합니다.</h1><p className="hero-copy">개인회생·파산부터 이혼 분쟁, 이혼전문변호사, 증여와 회생경제 정보까지. 지역별로 필요한 내용을 이해하기 쉽게 안내합니다.</p><div className="hero-actions"><a className="primary" href="#topics">분야별 정보 보기</a><a className="text-link" href="#regions">내 지역 정보 찾기 <b>→</b></a></div><div className="legal-note">※ 이 사이트의 콘텐츠는 일반적인 법률 정보이며, 개별 사안에 대한 법률 자문이 아닙니다.</div></section>
    <section className="topic-section" id="topics"><div className="section-title"><p className="eyebrow">법률 분야 안내</p><h2>지금 필요한 법률 정보를<br/>분야별로 찾아보세요.</h2></div><div className="topic-grid">{categories.map((c, i)=><Link href={`/category/${c.slug}`} className={`topic-card topic-${i}`} key={c.slug}><span className="topic-number">0{i+1}</span><h3>{c.name}</h3><p>{c.description}</p><span className="round-arrow">↗</span></Link>)}</div></section>
    <section className="district-menu"><p className="eyebrow">지역별 법률 안내</p><h2>서울 구별 회생·파산·이혼전문변호사</h2><p>거주 지역을 선택해 필요한 법률 안내로 바로 이동하세요.</p><div className="district-table-wrap"><table className="district-table"><thead><tr><th scope="col">지역구</th><th scope="col">개인회생</th><th scope="col">개인파산</th><th scope="col">이혼전문변호사</th></tr></thead><tbody>{seoulDistricts.map(d=><tr key={d}><th scope="row">{d}</th><td><Link href={`/region/${d}/rehabilitation`}>개인회생</Link></td><td><Link href={`/region/${d}/bankruptcy`}>개인파산</Link></td><td><Link href={`/region/${d}/divorce-lawyer`}>이혼전문변호사</Link></td></tr>)}</tbody></table></div></section>
    <section className="feature"><div className="feature-image"><span>주요<br/>법률 안내</span></div><article><p className="eyebrow">새로 발행된 안내</p><p className="article-meta">{featured.region} · {featured.category}</p><h2>{featured.title}</h2><p className="excerpt">{featured.excerpt}</p><Link className="read-link" href={`/posts/${featured.id}`}>자세히 읽기 <b>→</b></Link></article></section>
    <section className="regional" id="regions"><div className="section-title"><p className="eyebrow">지역별 안내</p><h2>내가 사는 지역의<br/>법률 안내를 확인하세요.</h2></div><div className="region-list">{regions.map((r)=><Link href={`/region/${r.slug}`} key={r.slug}><span>{r.name}</span><small>{r.count}개 지역 안내</small><b>→</b></Link>)}</div></section>
    <PublishedPosts />
    <section className="latest"><div className="latest-head"><div><p className="eyebrow">최근 발행글</p><h2>최근 법률 정보</h2></div><Link href="/articles">전체 글 보기 →</Link></div><div className="article-list">{articles.slice(0,3).map((a)=><Link href={`/posts/${a.id}`} key={a.id} className="article-row"><div><p>{a.region} · {a.category}</p><h3>{a.title}</h3></div><span>{a.date}</span><b>→</b></Link>)}</div></section>
    <section className="help"><p className="eyebrow">법률정보 시작하기</p><h2>어디서부터 봐야 할지<br/>막막하신가요?</h2><p>법률 문제의 종류와 거주 지역을 선택하면, 관련 정보를 차례로 살펴볼 수 있어요.</p><a className="primary light" href="#topics">법률정보 찾아보기</a></section>
    <section id="consult" className="consult"><p className="eyebrow">빠른 상담 안내</p><h2>분야에 맞는 상담으로<br/>바로 연결하세요.</h2><div className="consult-grid"><article><span>개인회생 · 개인파산</span><h3>채무 상담 바로가기</h3><p>채무헬프의 회생·파산 안내를 먼저 확인하거나, 하단 상담 신청 폼으로 이동할 수 있습니다.</p><div><a className="secondary" href={rehabilitationUrl} target="_blank" rel="noopener noreferrer">채무 안내 보기</a><DebtConsultButton className="primary">채무 상담 폼</DebtConsultButton></div></article><article><span>이혼 · 이혼소송</span><h3>이혼 상담 바로가기</h3><p>이혼 정보 안내와 상담 신청 폼을 분리해 빠르게 이용할 수 있습니다.</p><div><a className="secondary" href={divorceInfoUrl} target="_blank" rel="noopener noreferrer">이혼 안내 보기</a><a className="primary" href={divorceConsultUrl} target="_blank" rel="noopener noreferrer">이혼 상담 폼</a></div></article></div></section>
    <footer><Link className="brand" href="/"><span>우리동네</span> 법률사무소</Link><p>알기 쉬운 지역별 생활 법률 정보</p><div><Link href="/about">사이트 안내</Link><Link href="/privacy">개인정보처리방침</Link><Link href="/admin">관리자</Link></div><small>© 2026 우리동네 법률사무소. 본 사이트는 법률 정보 제공을 목적으로 합니다.</small></footer>
  </main>
}
