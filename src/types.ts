export enum NewsSource {
  NewsAPI = "NewsAPI",
  Guardian = "The Guardian",
  NYTimes = "The New York Times",
}

export interface Article {
  id: string;
  title: string;
  description: string;
  source: string;
  author: string;
  category: string;
  date: string;
  imageUrl: string;
  url: string;
  sourceType: NewsSource;
  publishedAt: string;
}

export interface Filter {
  search: string;
  category: string;
  source: string;
  date: string;
  author: string;
}

export interface UserPreferences {
  sources: string[];
  categories: string[];
  authors: string[];
}

export interface NewsApiParams {
  q?: string;
  from?: string;
  sortBy?: string;
  language?: string;
  country?: string;
  category?: string;
}

export interface GuardianParams {
  q?: string;
  from?: string;
  section?: string;
  tag?: string;
  showFields?: string;
}

export interface NYTimesParams {
  q?: string;
  begin_date?: string;
  section?: string;
  sort?: string;
}
