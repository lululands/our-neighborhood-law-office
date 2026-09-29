'use client';
import { useState } from 'react';

export default function SecuredLoanConsult(){
  const [opened,setOpened]=useState(false);
  return <section id="secured-loan" className="secured-loan">
    <p className="eyebrow">추가담보대출 정보</p>
    <h2>추가담보대출이 필요하다면<br/>상환 가능성부터 확인하세요.</h2>
    <p>담보가 있다고 해도 금리·한도·상환방식과 기존 채무를 함께 확인해야 합니다. 이 영역은 법률상담과 별도의 외부 금융 상담 폼으로 연결됩니다.</p>
    {!opened ? <button type="button" className="primary" onClick={()=>setOpened(true)}>추가담보대출 상담폼 열기</button> : <div className="secured-loan-frame"><p><strong>외부 상담폼 안내</strong> 입력한 정보는 appu.kr 상담폼으로 직접 전달됩니다. 조건·한도·금리는 상담 후 확인해 주세요.</p><iframe id="adwriteform" name="adwriteform" src="https://appu.kr/?i=12539431&t=o&f=o" title="추가담보대출 외부 상담폼" width="100%" height="800" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0}/></div>}
  </section>;
}
