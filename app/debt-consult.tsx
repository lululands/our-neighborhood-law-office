'use client';

import { useEffect, useState } from 'react';

const debtFormUrl = 'https://chaemuhelp.co.kr/#consult';

export function DebtConsultButton({ className = '', children = '채무 상담 폼' }: { className?: string; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return <>
    <button type="button" className={className} onClick={() => setOpen(true)}>{children}</button>
    {open && <div className="debt-modal-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
      <section className="debt-modal" role="dialog" aria-modal="true" aria-labelledby="debt-consult-title" onMouseDown={event => event.stopPropagation()}>
        <div className="debt-modal-head">
          <div><p>개인회생 · 개인파산</p><h2 id="debt-consult-title">무료 채무 상담 신청</h2></div>
          <button type="button" className="debt-modal-close" aria-label="상담 창 닫기" onClick={() => setOpen(false)}>×</button>
        </div>
        <p className="debt-modal-copy">상담 내용을 작성하면 채무헬프 상담 신청으로 안전하게 연결됩니다.</p>
        <iframe className="debt-modal-frame" title="채무헬프 무료 상담 신청" src={debtFormUrl} />
        <a className="debt-modal-external" href={debtFormUrl} target="_blank" rel="noopener noreferrer">새 창에서 상담 폼 열기 →</a>
      </section>
    </div>}
  </>;
}
