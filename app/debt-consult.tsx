const debtFormUrl = 'https://chaemuhelp.co.kr/#consult';

export function DebtConsultButton({ className = '', children = '채무 상담 폼' }: { className?: string; children?: React.ReactNode }) {
  return <a className={className} href={debtFormUrl} target="_blank" rel="noopener noreferrer">{children}</a>;
}
