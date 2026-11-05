import { NextRequest, NextResponse } from 'next/server';
export function middleware(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get('lang');
  const headers = new Headers(request.headers);
  if (lang && ['ru','en','uz'].includes(lang)) headers.set('x-demo-language',lang);
  const response = NextResponse.next({ request: { headers } });
  if (lang && ['ru','en','uz'].includes(lang)) response.cookies.set('i18next',lang,{ path:'/fire-safety-store', sameSite:'lax' });
  return response;
}
export const config = { matcher: ['/((?!_next|api|.*\\..*).*)'] };
