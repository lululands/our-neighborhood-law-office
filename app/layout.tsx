import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { metadataBase: new URL('https://our-neighborhood-law.example'), title: { default: '우리동네 법률사무소 | 지역별 생활 법률 정보', template: '%s | 우리동네 법률사무소' }, description: '개인회생, 개인파산, 이혼 분쟁, 이혼소송, 증여에 관한 지역별 생활 법률 정보.', openGraph: { title: '우리동네 법률사무소', description: '내 주변의 생활 법률 정보를 쉽게 찾으세요.', type: 'website', locale: 'ko_KR' }, alternates: { canonical: '/' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ko"><body>{children}</body></html>; }

