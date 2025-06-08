import { useEffect, useState, useCallback } from 'react';
import { apiPrivate } from '@/lib/api';
import { Transaction } from '@/lib/interfaces';

interface UseTransactionsResult {
  transactions: Transaction[];
  transactionsLoading: boolean;
  transactionsError: Error | null;
  refetch: () => Promise<void>;
}

export default function useTransactions(): UseTransactionsResult {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsLoading, setLoading] = useState<boolean>(true);
  const [transactionsError, setError] = useState<Error | null>(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWalletTransactions();
      const sortedData = data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setTransactions(sortedData);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    transactionsLoading,
    transactionsError,
    refetch: fetchTransactions,
  };
}

async function getWalletTransactions(): Promise<Transaction[]> {
  const response = await apiPrivate.get('/api/wallet/transactions');
  return response.data as Transaction[];
}
