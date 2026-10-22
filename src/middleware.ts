import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const hostname = (
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    request.nextUrl.hostname
  ).split(":")[0];
  if (hostname === "codev-tim.uz") {
    const canonical = new URL(
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
      "https://www.codev-tim.uz"
    );
    return NextResponse.redirect(canonical, 308);
  }

  // Old unprefixed URLs have a single permanent destination, independent of
  // browser language and cookies. Explicit /en and /uz routes stay available.
  if (!/^\/(en|ru|uz)(\/|$)/.test(request.nextUrl.pathname)) {
    const pathname = `/ru${request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname}`;
    // Next requires an absolute Location. Preserve a verified loopback Host in
    // local previews; use the public origin behind the hosting reverse proxy.
    const host = request.headers.get("host") ?? "";
    const origin = /^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host)
      ? `${request.nextUrl.protocol}//${host}`
      : "https://www.codev-tim.uz";
    return NextResponse.redirect(
      new URL(`${pathname}${request.nextUrl.search}`, origin),
      308
    );
  }
  const response = intlMiddleware(request);

  if (response instanceof NextResponse) {
    response.headers.set("x-pathname", request.nextUrl.pathname);
  }

  return response;
}

export const config = {
  matcher: ["/", "/(en|ru|uz)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
