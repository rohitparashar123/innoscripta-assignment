import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "../lib/api";
import { useNewsStore } from "../store/newsStore";
import { ArticleCard } from "./ArticleCard";
import { ArticleCardSkeleton } from "../components/loader/ArticleCardSkeleton";

export function NewsFeed() {
  const {
    filters,
    activeTab,
    favoriteAuthors,
    favoriteCategories,
    favoriteSources,
  } = useNewsStore();

  const {
    data: articles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news", filters],
    queryFn: () => fetchNews(filters),
    enabled: activeTab === "feed",
  });

  if (activeTab !== "feed") {
    const favorites = {
      authors: favoriteAuthors,
      categories: favoriteCategories,
      sources: favoriteSources,
    }[activeTab];

    if (!favorites.length) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No favorite {activeTab} yet.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArticleCardSkeleton featured />
        {[...Array(5)].map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">
          Error loading news articles. Please try again later.
        </p>
      </div>
    );
  }

  if (!articles?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          No articles found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <ArticleCard
          key={article.id}
          article={article}
          featured={index === 0}
        />
      ))}
    </div>
  );
}
