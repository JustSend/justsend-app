import { useState } from 'react';
import { apiPrivate } from '@/lib/api';

interface WithdrawData {
  amount: string;
  currency: string;
  routingNumber: string; // kept for UI purposes
}

interface WithdrawResponse {
  success: boolean;
  message: string;
}

export const useWithdraw = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const withdraw = async (data: WithdrawData): Promise<WithdrawResponse> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiPrivate.post('/api/wallet/withdraw', {
        amount: data.amount,
        currency: data.currency,
      });
      return response.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    withdraw,
    isLoading,
    error,
  };
};
