import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./components/Header";
import { NewsFilters } from "./components/NewsFilters";
import { NewsFeed } from "./components/NewsFeed";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          <NewsFilters />
          <NewsFeed />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
