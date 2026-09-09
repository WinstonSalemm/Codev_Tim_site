"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { trackPublicEvent } from "@/lib/analytics/events";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
const vercelAnalyticsEnabled =
  process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ENABLED === "true";

/**
 * Analytics load after idle - docs/08_TECH_STACK.md §2.12
 * No render-blocking scripts.
 */
export function DeferredAnalytics() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname))
      return;
    setEnabled(true);
    const onContactClick = (event: MouseEvent) => {
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (!link) return;
      const url = new URL(link.href);
      const method =
        url.protocol === "tel:"
          ? "phone"
          : url.protocol === "mailto:"
            ? "email"
            : url.hostname === "t.me"
              ? "telegram"
              : ["instagram.com", "www.instagram.com"].includes(url.hostname)
                ? "instagram"
                : undefined;
      const locale = document.documentElement.lang;
      if (method && (locale === "ru" || locale === "uz" || locale === "en"))
        trackPublicEvent("contact_click", { contact_method: method, locale });
    };
    document.addEventListener("click", onContactClick);
    return () => document.removeEventListener("click", onContactClick);
  }, []);
  if (!enabled) return null;
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
              gtag('config', '${gaMeasurementId}', {
                anonymize_ip: true,
                page_location: window.location.origin + window.location.pathname
              });
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
