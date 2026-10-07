import type { Metadata } from 'next';
import Link from 'next/link';
import { adminRegions } from '../../../content';
const topics=['rehabilitation','bankruptcy','divorce-lawyer','divorce-lawsuit'] as const;
const labels={rehabilitation:'개인회생',bankruptcy:'개인파산','divorce-lawyer':'이혼전문변호사','divorce-lawsuit':'이혼소송'};
export function generateStaticParams(){return adminRegions.flatMap(district=>topics.map(topic=>({district,topic})))}
export async function generateMetadata({params}:{params:Promise<{district:string;topic:keyof typeof labels}>}):Promise<Metadata>{const {district,topic}=await params;const label=labels[topic];return {title:`${district} ${label} 준비 안내 | 우리동네 법률사무소`,description:`${district}에서 ${label} 상담 전 확인할 자료와 기본 절차를 정리한 안내입니다.`,robots:{index:false,follow:true}}}
export default async function LocalTopicPage({params}:{params:Promise<{district:string;topic:keyof typeof labels}>}){const {district,topic}=await params;const label=labels[topic];if(!label)return <main className="post"><h1>찾을 수 없는 안내입니다.</h1><Link href="/">홈으로 돌아가기</Link></main>;return <main className="post"><Link className="breadcrumbs" href="/">홈</Link><p className="eyebrow">지역별 법률 안내</p><h1>{district} {label}</h1><p className="post-meta">{district} · {label}</p><div className="post-content"><p>{district} 지역에서 {label}을 알아볼 때 확인할 기본 절차와 준비 사항을 정리한 정보 페이지입니다.</p><p>개별 사안은 채무·재산·가족관계와 진행 경과에 따라 달라질 수 있으므로, 구체적인 상담 전에는 관련 자료를 정리해 두는 것이 좋습니다.</p></div><Link className="read-link" href="/#consult">상담 안내 보기 →</Link></main>}
