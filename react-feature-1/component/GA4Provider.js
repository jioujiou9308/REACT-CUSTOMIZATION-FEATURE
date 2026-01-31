import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { GA_MEASUREMENT_ID, pageview } from '../services/ga4';

export default function GA4Provider({ children }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // 如果沒有設定 GA_MEASUREMENT_ID，不載入 GA4 script
  if (!GA_MEASUREMENT_ID) {
    return <>{children}</>;
  }

  return (
    <>
      {/* GA4 Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      {children}
    </>
  );
}
