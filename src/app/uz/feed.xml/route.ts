import { loadArticlesRssFeed } from "@/lib/application/rss";

export const dynamic = "force-static";

export async function GET() {
  const xml = loadArticlesRssFeed("uz");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
