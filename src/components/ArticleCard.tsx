import { format } from "date-fns";
import { Bookmark, Hash, Globe } from "lucide-react";
import { Article } from "../types/news";
import { cn } from "../lib/utils";
import { useNewsStore } from "../store/newsStore";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  activeTab?: "authors" | "categories" | "sources";
}

const FAVORITE_TYPES = [
  { key: "authors", icon: Bookmark },
  { key: "categories", icon: Hash },
  { key: "sources", icon: Globe },
];

export function ArticleCard({
  article,
  featured,
  activeTab,
}: ArticleCardProps) {
  const {
    toggleFavorite,
    favoriteAuthors,
    favoriteCategories,
    favoriteSources,
  } = useNewsStore();

  const favoritesMap = {
    authors: favoriteAuthors,
    categories: favoriteCategories,
    sources: favoriteSources,
  };

  const isFavorite = (type: keyof typeof favoritesMap) => {
    return favoritesMap[type].some((item) => item.id === article.id);
  };

  const handleToggleFavorite = (
    type: keyof typeof favoritesMap,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    toggleFavorite(type, article);
  };

  const getButtonStyles = (
    type: keyof typeof favoritesMap,
    isFavorite: boolean
  ) => {
    const isActiveTab = activeTab === type;
    return cn("p-2 rounded-full backdrop-blur-sm transition-all", {
      "bg-blue-500 text-white": isFavorite,
      "bg-blue-400/50 text-white": isActiveTab && !isFavorite,
      "bg-black/20 text-white hover:bg-black/40": !isActiveTab && !isFavorite,
    });
  };

  return (
    <article
      className={cn(
        "group relative bg-white rounded-xl overflow-hidden border transition-all duration-300",
        "hover:shadow-lg hover:scale-[1.02]",
        featured ? "col-span-2 row-span-2" : ""
      )}
    >
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {FAVORITE_TYPES.map(({ key, icon: Icon }) => (
          <button
            key={key}
            onClick={(e) =>
              handleToggleFavorite(key as keyof typeof favoritesMap, e)
            }
            className={getButtonStyles(
              key as keyof typeof favoritesMap,
              isFavorite(key as keyof typeof favoritesMap)
            )}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="relative aspect-video w-full overflow-hidden">
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-blue-100 to-blue-50" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="absolute bottom-0 p-6 text-white">
          <div className="space-y-1 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500 bg-opacity-20 backdrop-blur-sm">
                {article.category}
              </span>
              <span className="text-blue-200">{article.source}</span>
            </div>
          </div>

          <h2
            className={cn(
              "font-bold leading-tight tracking-tight mb-2",
              featured ? "text-2xl" : "text-xl"
            )}
          >
            {article.title}
          </h2>

          {featured && (
            <p className="text-sm text-gray-300 mb-4 line-clamp-2">
              {article.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-300">
            {article.author && (
              <span className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-gray-600 mr-2" />
                {article.author}
              </span>
            )}
            <time>{format(new Date(article.publishedAt), "MMM d, yyyy")}</time>
          </div>
        </div>
      </a>
    </article>
  );
}
