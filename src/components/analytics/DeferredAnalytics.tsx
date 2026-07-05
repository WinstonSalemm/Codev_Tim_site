"use client";

import Script from "next/script";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
const vercelAnalyticsEnabled =
  process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ENABLED === "true";

/**
 * Analytics load after idle — docs/08_TECH_STACK.md §2.12
 * No render-blocking scripts.
 */
export function DeferredAnalytics() {
  return (
    <>
      {vercelAnalyticsEnabled ? (
        <Script
          id="vercel-analytics"
          src="/_vercel/insights/script.js"
          strategy="lazyOnload"
        />
      ) : null}
      {gaMeasurementId ? (
        <>
          <Script
            id="ga4-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="lazyOnload"
          />
          <Script id="ga4-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}
      {clarityProjectId ? (
        <Script id="clarity-init" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityProjectId}");
          `}
        </Script>
      ) : null}
    </>
  );
}
