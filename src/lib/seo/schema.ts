export type JsonLdOrganization = {
  "@type": "Organization";
  "@id": string;
  name: string;
  alternateName?: string;
  url: string;
};

export type JsonLdSearchAction = {
  "@type": "SearchAction";
  target: {
    "@type": "EntryPoint";
    urlTemplate: string;
  };
  "query-input": string;
};

export type JsonLdWebSite = {
  "@type": "WebSite";
  "@id": string;
  name: string;
  alternateName?: string;
  url: string;
  description: string;
  inLanguage: string[];
  publisher: { "@id": string };
  author: { "@id": string };
  potentialAction: JsonLdSearchAction;
};

export type DashboardJsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": [JsonLdOrganization, JsonLdWebSite];
};

export type JsonLdListItem = {
  "@type": "ListItem";
  position: number;
  name: string;
  item?: string;
  url?: string;
};

export type JsonLdBreadcrumbList = {
  "@type": "BreadcrumbList";
  "@id": string;
  itemListElement: JsonLdListItem[];
};

export type JsonLdCollectionPage = {
  "@type": "CollectionPage";
  "@id": string;
  name: string;
  description: string;
  url: string;
  inLanguage: string;
  breadcrumb: { "@id": string };
  mainEntity: { "@id": string };
};

export type JsonLdItemList = {
  "@type": "ItemList";
  "@id": string;
  name: string;
  numberOfItems: number;
  itemListElement: JsonLdListItem[];
};

export type RegistryJsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": [JsonLdBreadcrumbList, JsonLdCollectionPage, JsonLdItemList];
};

export type JsonLdTechArticle = {
  "@type": "TechArticle";
  "@id": string;
  headline: string;
  description: string;
  author: { "@id": string };
  datePublished: string;
  dateModified: string;
  inLanguage: string;
  url: string;
  image: string;
  breadcrumb: { "@id": string };
};

export type JsonLdSoftwareApplication = {
  "@type": "SoftwareApplication";
  "@id": string;
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  softwareVersion?: string;
  author: { "@id": string };
  description: string;
  url: string;
};

export type ProjectJsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": [
    JsonLdBreadcrumbList,
    JsonLdTechArticle,
    JsonLdSoftwareApplication,
  ];
};

export type JsonLdPostalAddress = {
  "@type": "PostalAddress";
  addressLocality: string;
  addressCountry: string;
};

export type JsonLdPerson = {
  "@type": "Person";
  "@id": string;
  name: string;
  alternateName: string;
  url: string;
  email: string;
  jobTitle: string[];
  knowsAbout: string[];
  address: JsonLdPostalAddress;
  sameAs: string[];
  worksFor: {
    "@type": "Organization";
    name: string;
    url: string;
  };
};

export type AboutJsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": [JsonLdBreadcrumbList, JsonLdProfilePage, JsonLdPerson];
};

export type JsonLdProfilePage = {
  "@type": "ProfilePage";
  "@id": string;
  name: string;
  description: string;
  url: string;
  inLanguage: string;
  breadcrumb: { "@id": string };
  mainEntity: { "@id": string };
};

export type JsonLdContactPage = {
  "@type": "ContactPage";
  "@id": string;
  name: string;
  description: string;
  url: string;
  inLanguage: string;
  breadcrumb: { "@id": string };
  mainEntity: { "@id": string };
};

export type JsonLdBlogPosting = {
  "@type": "BlogPosting";
  "@id": string;
  headline: string;
  description: string;
  author: { "@id": string };
  datePublished: string;
  dateModified: string;
  inLanguage: string;
  url: string;
  image: string;
  breadcrumb: { "@id": string };
};

export type PrinciplesJsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": [JsonLdBreadcrumbList, JsonLdCollectionPage, JsonLdItemList];
};

export type WritingJsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": [JsonLdBreadcrumbList, JsonLdCollectionPage, JsonLdItemList];
};

export type ContactJsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": [JsonLdBreadcrumbList, JsonLdContactPage];
};

export type ArticleJsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": [JsonLdBreadcrumbList, JsonLdTechArticle, JsonLdBlogPosting];
};
