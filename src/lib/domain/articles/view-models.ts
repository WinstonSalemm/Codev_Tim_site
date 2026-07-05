export type ArticleCardVM = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  cluster: string;
  tags: string[];
  datePublished: string;
  readingTime: number | null;
};

export type KnowledgeBaseVM = {
  notes: ArticleCardVM[];
  count: number;
};

export type KnowledgeBaseFilterOptionsVM = {
  tags: string[];
  clusters: string[];
  categories: string[];
};

export type KnowledgeBasePageVM = {
  notes: ArticleCardVM[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  query: {
    tag?: string;
    cluster?: string;
    category?: string;
    page: number;
  };
  filterOptions: KnowledgeBaseFilterOptionsVM;
};

export type ArticleNoteVM = {
  slug: string;
  locale: string;
  title: string;
  summary: string;
  category: string;
  cluster: string;
  tags: string[];
  datePublished: string;
  dateModified: string;
  readingTime: number | null;
  body: string;
};
