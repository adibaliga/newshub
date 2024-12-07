import axios from "axios";
import { format } from "date-fns";
import {
  NewsSource,
  NewsApiParams,
  GuardianParams,
  NYTimesParams,
} from "../../types";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;
console.log(import.meta.env.VITE_NYT_API_KEY);
const newsApiClient = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: {
    Authorization: `Bearer ${NEWS_API_KEY}`,
  },
});

const guardianClient = axios.create({
  baseURL: "https://content.guardianapis.com",
});

const nytClient = axios.create({
  baseURL: "https://api.nytimes.com/svc/search/v2",
});

export const fetchNewsApiArticles = async (params: NewsApiParams) => {
  const { data } = await newsApiClient.get("/top-headlines", { params });
  return transformNewsApiResponse(data);
};

export const fetchGuardianArticles = async (params: GuardianParams) => {
  const { data } = await guardianClient.get("/search", {
    params: {
      ...params,
      "api-key": GUARDIAN_API_KEY,
    },
  });
  return transformGuardianResponse(data);
};

export const fetchNYTimesArticles = async (params: NYTimesParams) => {
  const { data } = await nytClient.get("/articlesearch.json", {
    params: {
      ...params,
      "api-key": NYT_API_KEY,
    },
  });
  return transformNYTimesResponse(data);
};

const transformNewsApiResponse = (data: any) => {
  return data.articles.map((article: any) => ({
    id: article.url,
    title: article.title,
    description: article.description,
    source: article.source.name,
    author: article.author || "Unknown",
    category: article.category || "General",
    date: format(new Date(article.publishedAt), "MMM dd, yyyy"),
    imageUrl: article.urlToImage || "https://via.placeholder.com/640x360",
    url: article.url,
    sourceType: NewsSource.NewsAPI,
  }));
};

const transformGuardianResponse = (data: any) => {
  return data.response.results.map((article: any) => ({
    id: article.id,
    title: article.webTitle,
    description: article.fields?.trailText || "",
    source: "The Guardian",
    author: article.fields?.byline || "Unknown",
    category: article.sectionName,
    date: format(new Date(article.webPublicationDate), "MMM dd, yyyy"),
    imageUrl:
      article.fields?.thumbnail || "https://via.placeholder.com/640x360",
    url: article.webUrl,
    sourceType: NewsSource.Guardian,
  }));
};

const transformNYTimesResponse = (data: any) => {
  return data.response.docs.map((article: any) => ({
    id: article._id,
    title: article.headline.main,
    description: article.abstract || article.snippet || "",
    source: "The New York Times",
    author: article.byline?.original?.replace("By ", "") || "Unknown",
    category: article.section_name || "General",
    date: format(new Date(article.pub_date), "MMM dd, yyyy"),
    imageUrl: article.multimedia?.[0]?.url
      ? `https://www.nytimes.com/${article.multimedia[0].url}`
      : "https://via.placeholder.com/640x360",
    url: article.web_url,
    sourceType: NewsSource.NYTimes,
  }));
};
