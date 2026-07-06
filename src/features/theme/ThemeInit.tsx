import { THEME_STORAGE_KEY } from "./constants";

const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var s=localStorage.getItem(k);var p=s==="light"||s==="dark"?s:"system";var m=p==="system"?(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"):p;document.documentElement.dataset.theme=m;document.documentElement.dataset.themePreference=p;document.documentElement.style.colorScheme=m;var c=m==="light"?"#ffffff":"#000000";var el=document.querySelector('meta[name="theme-color"]');if(el)el.setAttribute("content",c);}catch(e){document.documentElement.dataset.theme="dark";document.documentElement.dataset.themePreference="system";}})();`;

export function ThemeInit() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeInitScript }}
      suppressHydrationWarning
    />
  );
}
