import { useState, useEffect } from 'react';
import { apiPrivate } from '@/lib/api';

export interface WalletBalance {
  currency: string;
  amount: number;
  symbol: string;
}

export function useBalances() {
  const [balances, setBalances] = useState<WalletBalance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        setLoading(true);
        const response = await apiPrivate.get('/api/wallet');
        const balanceMap = response.data;
        const balanceArray = Object.entries(balanceMap).map(
          ([currency, amount]) => ({
            currency,
            amount: amount as number,
            symbol: '$',
          })
        );
        console.log(balanceArray);
        if (balanceArray.length === 0) {
          setBalances([{ currency: 'USD', amount: 0, symbol: '$' }]);
        } else {
          setBalances(balanceArray);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch balances');
        // Set default balance on error too
        setBalances([{ currency: 'USD', amount: 0, symbol: '$' }]);
      } finally {
        setLoading(false);
      }
    };
    fetchBalances();
  }, []);

  return { balances, loading, error };
}
