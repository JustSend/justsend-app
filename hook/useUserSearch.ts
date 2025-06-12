import { useState, useEffect, useCallback, useRef } from 'react';
import { apiPrivate } from '@/lib/api';
import debounce from 'lodash/debounce';
import { User } from '@/lib/user';

type DebouncedFunc = ReturnType<typeof debounce>;

export function useUserSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedSearchRef = useRef<DebouncedFunc | null>(null);

  const searchUsers = useCallback(async (term: string) => {
    if (!term || term.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await apiPrivate.get<User[]>('/api/user/search', {
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
  }, []);

  useEffect(() => {
    debouncedSearchRef.current = debounce((term: string) => {
      searchUsers(term);
    }, 500);

    return () => {
      debouncedSearchRef.current?.cancel();
    };
  }, [searchUsers]);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearchRef.current?.(searchTerm);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    results,
    loading,
    error,
  };
}
