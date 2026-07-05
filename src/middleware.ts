import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  if (response instanceof NextResponse) {
    response.headers.set("x-pathname", request.nextUrl.pathname);
  }

  return response;
}

export const config = {
  matcher: ["/", "/(en|ru|uz)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
