import { X, Calendar } from "lucide-react";
import { useNewsStore } from "../store/newsStore";
import { Category, NewsSource } from "../types/news";
import { Button } from "./ui/Button";
import { Select } from "./ui/Select";

const sources: { id: NewsSource; label: string }[] = [
  { id: "newsapi", label: "NewsAPI" },
  { id: "guardian", label: "The Guardian" },
  { id: "nytimes", label: "The New York Times" },
];

const categories: { id: Category; label: string }[] = [
  { id: "general", label: "All Categories" },
  { id: "business", label: "Business" },
  { id: "technology", label: "Technology" },
  { id: "sports", label: "Sports" },
  { id: "entertainment", label: "Entertainment" },
  { id: "science", label: "Science" },
  { id: "health", label: "Health" },
];

export function NewsFilters() {
  const {
    filters,
    toggleSource,
    toggleCategory,
    setDateRange,
    resetFilters,
    activeTab,
  } = useNewsStore();

  if (activeTab !== "feed") {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 sticky top-4 z-10">
      <div className="flex flex-wrap items-center gap-4">
        <Select
          value={filters.categories[0]}
          onChange={(e) => toggleCategory(e.target.value as Category)}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </Select>

        <Select
          value={filters.sources[0]}
          onChange={(e) => toggleSource(e.target.value as NewsSource)}
        >
          {sources.map((source) => (
            <option key={source.id} value={source.id}>
              {source.label}
            </option>
          ))}
        </Select>

        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="date"
            value={filters.dateFrom || ""}
            onChange={(e) => setDateRange(e.target.value, filters.dateTo)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="ml-auto"
        >
          Clear Filters
          <X className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
