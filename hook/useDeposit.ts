import { useState } from 'react';
import { apiPrivate } from '@/lib/api';

interface DepositParams {
  bankRouting: string;
  currency: string;
  amount: number;
}

export function useDeposit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deposit = async (params: DepositParams) => {
    try {
      setLoading(true);
      setError(null);

      const depositData = {
        currency: params.currency,
        amount: params.amount,
        bank_routing: params.bankRouting,
      };

      const response = await apiPrivate.post(
        '/api/wallet/deposit',
        depositData
      );
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Failed to process DEBIN deposit'
      );
      return {
        success: false,
        message:
          err.response?.data?.message || 'Failed to process DEBIN deposit',
      };
    } finally {
      setLoading(false);
    }
  };

  return { deposit, loading, error };
}
