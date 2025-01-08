import { create } from "zustand";
import { Category, NewsFilters, NewsSource, Article } from "../types/news";

const STORAGE_KEYS = {
  AUTHORS: "favoriteAuthors",
  CATEGORIES: "favoriteCategories",
  SOURCES: "favoriteSources",
} as const;

const TABS = {
  FEED: "feed",
  AUTHORS: "authors",
  CATEGORIES: "categories",
  SOURCES: "sources",
} as const;

type TabType = (typeof TABS)[keyof typeof TABS];
type FavoriteType = "authors" | "categories" | "sources";

interface StorageService {
  load: <T>(key: string) => T[];
  save: (key: string, data: Article[]) => void;
}

interface NewsStore {
  filters: NewsFilters;
  activeTab: TabType;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  favoriteAuthors: Article[];
  favoriteCategories: Article[];
  favoriteSources: Article[];
  setSearch: (search: string) => void;
  toggleSource: (source: NewsSource) => void;
  toggleCategory: (category: Category) => void;
  setDateRange: (from?: string, to?: string) => void;
  resetFilters: () => void;
  setActiveTab: (tab: TabType) => void;
  toggleFavorite: (type: FavoriteType, article: Article) => void;
  toggleMobileMenu: () => void;
  toggleSearch: () => void;
}

const initialFilters: NewsFilters = {
  search: "",
  sources: ["newsapi", "guardian", "nytimes"],
  categories: ["general"],
  dateFrom: undefined,
  dateTo: undefined,
};

const localStorageService: StorageService = {
  load: <T>(key: string): T[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  },
  save: (key: string, data: Article[]): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(data));
  },
};

const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

const getFavoriteKey = (type: FavoriteType): string =>
  `favorite${capitalize(type)}`;

export const useNewsStore = create<NewsStore>((set) => ({
  filters: initialFilters,
  activeTab: TABS.FEED,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  favoriteAuthors: localStorageService.load<Article>(STORAGE_KEYS.AUTHORS),
  favoriteCategories: localStorageService.load<Article>(
    STORAGE_KEYS.CATEGORIES
  ),
  favoriteSources: localStorageService.load<Article>(STORAGE_KEYS.SOURCES),

  setSearch: (search) =>
    set((state) => ({
      filters: { ...state.filters, search },
    })),

  toggleSource: (source: NewsSource) =>
    set((state) => ({
      filters: {
        ...state.filters,
        sources: [source],
      },
    })),

  toggleCategory: (category: Category) =>
    set((state) => ({
      filters: {
        ...state.filters,
        categories: [category],
      },
    })),

  setDateRange: (from, to) =>
    set((state) => ({
      filters: { ...state.filters, dateFrom: from, dateTo: to },
    })),

  resetFilters: () => set({ filters: initialFilters }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  toggleFavorite: (type, article) =>
    set((state) => {
      const favoriteKey = getFavoriteKey(type);
      const favorites = state[favoriteKey as keyof NewsStore] as Article[];
      const newFavorites = favorites.some((a) => a.id === article.id)
        ? favorites.filter((a) => a.id !== article.id)
        : [...favorites, article];

      localStorageService.save(favoriteKey, newFavorites);
      return { [favoriteKey]: newFavorites } as Partial<NewsStore>;
    }),

  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
}));
