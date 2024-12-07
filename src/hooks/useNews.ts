import { useQuery } from "react-query";
import {
  fetchNewsApiArticles,
  fetchGuardianArticles,
  fetchNYTimesArticles,
} from "../services/api/newsApi";
import { Article, Filter, UserPreferences } from "../types";
import { sources } from "../constants";

export const useNews = (filters: Filter, preferences: UserPreferences) => {
  const queryParams = {
    q: filters.search || undefined,
    from: filters.date || undefined,
    sortBy: "publishedAt",
    language: "en",
    category: filters.category?.toLowerCase() || undefined,
    country: "us",
  };

  const newsApiQuery = useQuery(
    ["newsApi", queryParams],
    () => fetchNewsApiArticles(queryParams),
    {
      enabled:
        (!preferences.sources.length ||
          preferences.sources.includes(sources.NewsAPI)) &&
        (!filters.source || filters.source === sources.NewsAPI),
    }
  );

  const guardianQuery = useQuery(
    ["guardian", queryParams],
    () => fetchGuardianArticles(queryParams),
    {
      enabled:
        (!preferences.sources.length ||
          preferences.sources.includes(sources.TheGuardian)) &&
        (!filters.source || filters.source === sources.TheGuardian),
    }
  );
  const nytQuery = useQuery(
    ["nytimes", queryParams],
    () =>
      fetchNYTimesArticles({
        q: queryParams.q,
        section: filters.category?.toLowerCase(),
        begin_date: queryParams.from?.replace(/-/g, ""),
      }),
    {
      enabled:
        (!preferences.sources.length ||
          preferences.sources.includes(sources.TheNewYorkTimes)) &&
        (!filters.source || filters.source === sources.TheNewYorkTimes),
    }
  );

  const isLoading =
    newsApiQuery.isLoading || guardianQuery.isLoading || nytQuery.isLoading;
  const error =
    newsApiQuery.error || guardianQuery.error || nytQuery.error
      ? "Failed to fetch news articles. Please try again later."
      : null;

  const allArticles = [
    ...(newsApiQuery.data || []),
    ...(guardianQuery.data || []),
    ...(nytQuery.data || []),
  ];

  const authors = Array.from(
    new Set(
      allArticles
        .map((article) => article.author.split(", \n")[0])
        .filter((author) => author && author.toLowerCase() !== "unknown")
    )
  );

  const articles: Article[] = allArticles.filter((article: Article) => {
    const matchesFilters =
      (!filters.source || article.sourceType === filters.source) &&
      (!filters.date ||
        new Date(article.date).toISOString().split("T")[0] === filters.date) &&
      (!filters.author || article.author === filters.author);

    const matchesPreferences =
      (!preferences.sources.length ||
        preferences.sources.includes(article.sourceType)) &&
      (!preferences.authors.length ||
        preferences.authors.includes(article.author)) &&
      (!preferences.categories.length ||
        preferences.categories.includes(article.category));

    return matchesFilters && matchesPreferences;
  });

  return {
    articles,
    isLoading,
    error,
    authors,
  };
};
