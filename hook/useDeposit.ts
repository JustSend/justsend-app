import { useState } from 'react';
import { apiExternal } from '@/lib/api';
import { auth } from '@/firebaseConfig';

interface DepositParams {
  cardNumber?: string;
  expirationDate?: string;
  secureDigits?: string;
  bankAccount?: string;
  bankRouting?: string;
  currency: string;
  amount: number;
  method: 'card' | 'bank';
}

export function useDeposit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deposit = async (params: DepositParams) => {
    try {
      setLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) {
        throw new Error('No authenticated user found');
      }

      const token = await user.getIdToken();
      const depositData = {
        currency: params.currency,
        amount: params.amount,
        method: params.method,
        token,
        ...(params.method === 'card'
          ? {
              card_number: params.cardNumber,
              expiration_date: params.expirationDate,
              secure_digits: params.secureDigits,
            }
          : {
              bank_account: params.bankAccount,
              bank_routing: params.bankRouting,
            }),
      };

      const response = await apiExternal.post('/external-deposit', depositData);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to deposit funds');
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to deposit funds',
      };
    } finally {
      setLoading(false);
    }
  };

  return { deposit, loading, error };
}
