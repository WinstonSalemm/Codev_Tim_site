import { THEME_STORAGE_KEY } from "./constants";

const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);var m=t==="light"?"light":"dark";document.documentElement.dataset.theme=m;document.documentElement.style.colorScheme=m;var c=m==="light"?"#ffffff":"#000000";var el=document.querySelector('meta[name="theme-color"]');if(el)el.setAttribute("content",c);}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export function ThemeInit() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeInitScript }}
      suppressHydrationWarning
    />
  );
}
