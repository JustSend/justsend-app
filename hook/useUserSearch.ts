import { useState, useEffect } from 'react';
import { apiPrivate } from '@/lib/api';
import debounce from 'lodash/debounce';
import { User } from 'firebase/auth';

export function useUserSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUsers = async (term: string) => {
    if (!term || term.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await apiPrivate.get<User[]>('/api/users/search', {
        params: { query: term },
      });
      setResults(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to search users');
      console.error('Error searching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(searchUsers, 200);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    results,
    loading,
    error,
  };
}
