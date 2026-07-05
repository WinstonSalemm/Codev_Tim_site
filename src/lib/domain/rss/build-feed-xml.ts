import type { RSSFeedDescriptor, RSSEntry } from "./types";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderItem(item: RSSEntry): string {
  const categories = item.category
    ? `\n      <category>${escapeXml(item.category)}</category>`
    : "";

  return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="true">${escapeXml(item.guid)}</guid>
      <pubDate>${escapeXml(item.pubDate)}</pubDate>
      <description>${escapeXml(item.description)}</description>${categories}
      <author>${escapeXml(item.author)}</author>
    </item>`;
}

export function renderRssFeedXml(feed: RSSFeedDescriptor): string {
  const items = feed.items.map(renderItem).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(feed.title)}</title>
    <link>${escapeXml(feed.link)}</link>
    <description>${escapeXml(feed.description)}</description>
    <language>${escapeXml(feed.language)}</language>
    <lastBuildDate>${escapeXml(feed.lastBuildDate)}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}
