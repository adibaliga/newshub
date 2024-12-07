import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Header } from "./components/Header";
import { SearchFilters } from "./components/SearchFilters";
import { ArticleCard } from "./components/ArticleCard";
import { SettingsModal } from "./components/SettingsModal";
import { useNews } from "./hooks/useNews";
import { Filter, UserPreferences } from "./types";
import { ArticleCardSkeleton } from "./components/ArticleCardSkeleton";

const queryClient = new QueryClient();

function NewsApp() {
  const [filters, setFilters] = useState<Filter>({
    search: "",
    category: "",
    source: "",
    date: "",
    author: "",
  });

  const [preferences, setPreferences] = useState<UserPreferences>({
    sources: [],
    authors: [],
    categories: [],
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { articles, isLoading, error, authors } = useNews(filters, preferences);

  const handleSavePreferences = (newPreferences: UserPreferences) => {
    setPreferences(newPreferences);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchFilters
          filters={filters}
          authors={authors}
          onFilterChange={setFilters}
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? [...Array(6)].map(() => (
                <ArticleCardSkeleton key={`skeleton-${crypto.randomUUID()}`} />
              ))
            : Array.from(new Set(articles.map((a) => a.url))).map((url) => {
                const article = articles.find((a) => a.url === url);
                return article && <ArticleCard key={url} article={article} />;
              })}
        </div>

        {error instanceof Error && (
          <div className="mt-8 text-center text-red-600">
            {error.message ||
              "An error occurred while fetching the news. Please try again later."}
          </div>
        )}

        {!isLoading && !error && articles.length === 0 && (
          <div className="mt-8 text-center text-gray-600">
            No articles found matching your criteria.
          </div>
        )}
      </main>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        preferences={preferences}
        onSavePreferences={handleSavePreferences}
        authors={authors}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NewsApp />
    </QueryClientProvider>
  );
}

export default App;
