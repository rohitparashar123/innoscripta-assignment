import axios from "axios";
import { Article, NewsFilters } from "../types/news";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

const clients = {
  newsapi: axios.create({
    baseURL: "https://newsapi.org/v2",
    params: { apiKey: NEWS_API_KEY },
  }),
  guardian: axios.create({
    baseURL: "https://content.guardianapis.com",
    params: { "api-key": GUARDIAN_API_KEY },
  }),
  nyt: axios.create({
    baseURL: "https://api.nytimes.com/svc/search/v2",
    params: { "api-key": NYT_API_KEY },
  }),
};

export async function fetchNews(filters: NewsFilters): Promise<Article[]> {
  const fetchers: Record<string, (filters: NewsFilters) => Promise<Article[]>> =
    {
      newsapi: fetchFromNewsApi,
      guardian: fetchFromGuardian,
      nytimes: fetchFromNYT,
    };

  const promises = filters.sources
    .filter((source) => fetchers[source])
    .map((source) => fetchers[source](filters));

  const results = await Promise.all(promises);
  return results.flat();
}

function buildQuery(filters: NewsFilters): string {
  return [
    filters.search,
    filters.categories[0] !== "general" ? filters.categories[0] : "",
  ]
    .filter(Boolean)
    .join(" ");
}

async function fetchFromNewsApi(filters: NewsFilters): Promise<Article[]> {
  const query = buildQuery(filters);
  const { data } = await clients.newsapi.get("/everything", {
    params: {
      q: query || "news",
      from: filters.dateFrom,
      to: filters.dateTo,
      language: "en",
      sortBy: "publishedAt",
      pageSize: 10,
    },
  });

  return data.articles.map(mapNewsApiArticle(filters.categories[0]));
}

async function fetchFromGuardian(filters: NewsFilters): Promise<Article[]> {
  const query = buildQuery(filters);
  const { data } = await clients.guardian.get("/search", {
    params: {
      q: query,
      "from-date": filters.dateFrom,
      "to-date": filters.dateTo,
      "show-fields": "all",
      "page-size": 10,
    },
  });

  return data.response.results.map(mapGuardianArticle(filters.categories[0]));
}

async function fetchFromNYT(filters: NewsFilters): Promise<Article[]> {
  const query = buildQuery(filters);
  const { data } = await clients.nyt.get("/articlesearch.json", {
    params: {
      q: query,
      begin_date: filters.dateFrom?.replace(/-/g, ""),
      end_date: filters.dateTo?.replace(/-/g, ""),
    },
  });

  return data.response.docs
    .slice(0, 10)
    .map(mapNYTArticle(filters.categories[0]));
}

function mapNewsApiArticle(category: string) {
  return (article: any): Article => ({
    id: `newsapi-${article.url}`,
    title: article.title,
    description: article.description,
    url: article.url,
    imageUrl: article.urlToImage,
    source: "NewsAPI",
    category,
    author: article.author,
    publishedAt: article.publishedAt,
  });
}

function mapGuardianArticle(category: string) {
  return (article: any): Article => ({
    id: `guardian-${article.id}`,
    title: article.webTitle,
    description: article.fields?.trailText,
    url: article.webUrl,
    imageUrl: article.fields?.thumbnail,
    source: "The Guardian",
    category,
    author: article.fields?.byline,
    publishedAt: article.webPublicationDate,
  });
}

function mapNYTArticle(category: string) {
  return (article: any): Article => ({
    id: `nyt-${article._id}`,
    title: article.headline.main,
    description: article.abstract,
    url: article.web_url,
    imageUrl: article.multimedia[0]?.url
      ? `https://www.nytimes.com/${article.multimedia[0].url}`
      : undefined,
    source: "The New York Times",
    category,
    author: article.byline?.original,
    publishedAt: article.pub_date,
  });
}
