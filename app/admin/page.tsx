'use client';
import { useState } from 'react';
import Link from 'next/link';
import { categories, seoulDistricts } from '../content';

export default function Admin(){
 const [done,setDone]=useState(false); const [district,setDistrict]=useState('도봉구'); const [category,setCategory]=useState('개인회생');
 const title=`${district} ${category} 안내 - 절차와 준비 서류`;
 return <main><header className="site-header"><Link className="brand" href="/"><span>우리동네</span> 법률사무소</Link><a className="header-cta" href={process.env.NEXT_PUBLIC_CONSULT_URL ?? '/#consult'}>상담 바로하기</a></header><section className="admin"><p className="eyebrow">CONTENT DESK</p><h1>지역구 법률정보 발행</h1><p>구 단위 지역과 분야를 선택하면 ‘도봉구 개인회생’처럼 검색용 제목이 구성됩니다.</p><div className="admin-grid"><form className="editor" onSubmit={e=>{e.preventDefault();setDone(true)}}>{done&&<div className="admin-success">발행 준비가 완료되었습니다. 연결 후 이 정보는 새 숫자형 게시글로 저장됩니다.</div>}<label className="field">지역구<select value={district} onChange={e=>setDistrict(e.target.value)}>{seoulDistricts.map(x=><option key={x}>{x}</option>)}</select></label><label className="field">메뉴·카테고리<select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(x=><option key={x.slug}>{x.name}</option>)}<option>이혼전문변호사</option></select></label><label className="field">SEO 제목<input required value={title} onChange={()=>{}}/></label><label className="field">태그<input defaultValue={`${district}, ${category}`}/></label><label className="field">대표 이미지 URL<input type="url" placeholder="https://..."/></label><label className="field">본문<textarea required placeholder="독자가 이해하기 쉬운 안내 내용을 작성하세요."/></label><label className="field">관련 링크<input type="url" placeholder="기존 내부 또는 상담 링크"/></label><button className="primary publish">게시글 발행하기</button></form><aside className="publish-panel"><p className="eyebrow">발행 설정</p><h3>지역명 기반 메뉴</h3><p>{district} 개인회생 · {district} 개인파산 · {district} 이혼전문변호사 · {district} 이혼소송</p><hr/><h3>검색 노출 구조</h3><p>숫자형 주소, canonical, Open Graph, 구조화데이터, 사이트맵과 RSS에 연결됩니다.</p></aside></div></section></main>
}

