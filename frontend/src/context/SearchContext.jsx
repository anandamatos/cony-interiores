import { createContext, useContext, useMemo, useState } from 'react';

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [query, setQuery] = useState('');

  const clearQuery = () => setQuery('');

  const value = useMemo(() => ({
    query,
    setQuery,
    clearQuery,
  }), [query]);

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }

  return context;
}
