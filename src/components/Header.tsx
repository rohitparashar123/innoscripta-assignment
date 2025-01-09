import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { useNewsStore } from "../store/newsStore";
import { cn } from "../lib/utils";

const navItems = [
  { icon: "Newspaper", label: "feed", id: "feed" },
  { icon: "Bookmark", label: "favorite authors", id: "authors" },
  { icon: "Hash", label: "favorite categories", id: "categories" },
  { icon: "Globe", label: "favorite sources", id: "sources" },
] as const;

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

function NavItem({
  id,
  label,
  icon: IconName,
  isActive,
  onClick,
}: {
  id: string;
  label: string;
  icon: keyof typeof Icons;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = Icons[IconName] as React.ElementType;
  return (
    <button
      key={id}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors",
        isActive ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative w-full">
      <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type="text"
        placeholder="Search the news..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-500
          focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
      />
    </div>
  );
}

export function Header() {
  const {
    setSearch,
    activeTab,
    setActiveTab,
    isMobileMenuOpen,
    isSearchOpen,
    toggleMobileMenu,
    toggleSearch,
  } = useNewsStore();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      setSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, setSearch]);

  return (
    <header className="bg-white border-b sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between md:justify-start gap-8">
          <h1 className="text-xl font-bold text-gray-900">Innoscripta</h1>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map(({ icon, label, id }) => (
              <NavItem
                key={id}
                id={id}
                label={label}
                icon={icon}
                isActive={activeTab === id}
                onClick={() => setActiveTab(id)}
              />
            ))}
          </nav>

          <div className="hidden md:flex flex-1 max-w-lg">
            <SearchInput
              value={searchTerm}
              onChange={(value) => setSearchTerm(value)}
            />
          </div>

          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleSearch}
              className="p-2 text-gray-500 hover:text-gray-900"
            >
              <Icons.Search className="h-6 w-6" />
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-500 hover:text-gray-900"
            >
              {isMobileMenuOpen ? (
                <Icons.X className="h-6 w-6" />
              ) : (
                <Icons.Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="md:hidden mt-4">
            <SearchInput
              value={searchTerm}
              onChange={(value) => setSearchTerm(value)}
            />
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-[73px] bg-white/80 backdrop-blur-sm z-30">
            <nav className="bg-white border-t">
              <div className="flex flex-col space-y-2 p-4">
                {navItems.map(({ icon, label, id }) => (
                  <NavItem
                    key={id}
                    id={id}
                    label={label}
                    icon={icon}
                    isActive={activeTab === id}
                    onClick={() => {
                      setActiveTab(id);
                      toggleMobileMenu();
                    }}
                  />
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
