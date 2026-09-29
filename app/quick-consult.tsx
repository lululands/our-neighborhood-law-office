import { DebtConsultButton } from './debt-consult';
const divorceConsultUrl='https://replyalba.com/intros/_frm/index.php?code=C3Q8SJMSPK';
export default function QuickConsult(){return <aside className="quick-consult" aria-label="빠른 상담 바로가기"><div><strong>빠른 상담 바로가기</strong><span>필요한 분야를 선택해 상담 신청 화면으로 이동하세요.</span></div><p><DebtConsultButton className="quick-debt">회생·파산 상담 폼</DebtConsultButton><a className="quick-divorce" href={divorceConsultUrl} target="_blank" rel="noopener noreferrer">이혼소송 상담 폼</a></p></aside>}
