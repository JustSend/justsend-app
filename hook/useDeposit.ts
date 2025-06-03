import { useState } from 'react';
import { apiPrivate } from '@/lib/api';

interface DepositParams {
  currency: string;
  amount: number;
}

export function useDeposit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deposit = async (money: DepositParams) => {
    try {
      setLoading(true);
      setError(null);
      await apiPrivate.post('/api/wallet/deposit', money);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to deposit funds');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deposit, loading, error };
}
