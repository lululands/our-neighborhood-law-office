import type { Metadata } from 'next';
import './globals.css';
import IdentityWidget from './identity-widget';

const origin='https://dongnelaw-guide.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: { default: '우리동네 법률사무소 | 지역별 생활 법률 정보', template: '%s | 우리동네 법률사무소' },
  description: '개인회생, 개인파산, 이혼 분쟁, 이혼전문변호사, 증여에 관한 지역별 생활 법률 정보.',
  alternates: { canonical: origin },
  robots: { index: true, follow: true },
  verification: { other: { 'naver-site-verification': '13e5d3a687c2c00b8ee710467d449917600c142c' } },
  openGraph: { title: '우리동네 법률사무소', description: '내 주변의 생활 법률 정보를 쉽게 찾으세요.', type: 'website', locale: 'ko_KR', url: origin }
};

const websiteSchema={
  '@context':'https://schema.org',
  '@type':'WebSite',
  name:'우리동네 법률사무소',
  url:origin,
  description:'개인회생, 개인파산, 이혼 분쟁과 생활 법률 정보를 지역별로 안내합니다.',
  inLanguage:'ko-KR'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><head>
    <link rel="alternate" type="application/rss+xml" title="우리동네 법률사무소 RSS" href="/rss.xml" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteSchema)}} />
  </head><body><IdentityWidget />{children}</body></html>;
}
