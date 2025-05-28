import { useState, useEffect } from 'react';
import { apiPrivate } from '@/lib/api';

export function useBalance(currency: string) {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currency) return;

    const fetchBalance = async () => {
      try {
        setLoading(true);
        const response = await apiPrivate.get(`/api/wallet/${currency}`);
        setBalance(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch balance');
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [currency]);

  return { balance, loading, error };
}
