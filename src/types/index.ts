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

export enum NewsSource {
  NewsAPI = "NewsAPI",
  Guardian = "guardian",
  NYTimes = "nytimes",
}

export interface NewsApiParams {
  q?: string;
  category?: string;
  from?: string;
}

export interface GuardianParams {
  q?: string;
  section?: string;
  from_date?: string;
}

export interface NYTimesParams {
  q?: string;
  section?: string;
  begin_date?: string;
}
