import { useState } from 'react';
import { apiExternal } from '@/lib/api';

interface CardValidationParams {
  cardNumber: string;
  expirationDate: string;
  secureDigits: string;
}

interface CardValidationResult {
  valid: boolean;
  status: string;
  message: string;
  token?: string;
}

export function useCardValidation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateCard = async (
    card: CardValidationParams
  ): Promise<CardValidationResult> => {
    try {
      setLoading(true);
      setError(null);
      const cardData = {
        card_number: card.cardNumber,
        expiration_date: card.expirationDate,
        secure_digits: card.secureDigits,
      };
      const response = await apiExternal.post('/validate-card', cardData);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to validate card');
      return {
        valid: false,
        status: 'error',
        message: err.message || 'Failed to validate card',
      };
    } finally {
      setLoading(false);
    }
  };

  return { validateCard, loading, error };
}
