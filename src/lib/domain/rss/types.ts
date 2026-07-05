export type RSSEntry = {
  title: string;
  link: string;
  guid: string;
  pubDate: string;
  description: string;
  category?: string;
  author: string;
};

export type RSSFeedDescriptor = {
  title: string;
  link: string;
  description: string;
  language: string;
  lastBuildDate: string;
  items: RSSEntry[];
};
