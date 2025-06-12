import { useState } from 'react';
import { User } from '@/lib/user';
import { apiPrivate } from '@/lib/api';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

interface SendParams {
  recipient: User;
  amount: number;
  currency: string;
}

interface SendResponse {
  success: boolean;
  message?: string;
}

export const useSend = () => {
  const [loading, setLoading] = useState(false);

  const send = async (params: SendParams): Promise<SendResponse> => {
    setLoading(true);
    try {
      const transaction = {
        to: {
          alias: params.recipient.alias,
          email: params.recipient.email,
        },
        money: {
          amount: params.amount,
          currency: params.currency,
        },
      };

      const response = await apiPrivate.post('/api/wallet/send', transaction);

      if (!response.data.success) {
        Toast.show({
          type: 'error',
          text1: 'Transaction Failed',
          text2: response.data.message || 'Failed to send money',
          position: 'top',
          visibilityTime: 4000,
        });
        return {
          success: false,
          message: response.data.message,
        };
      }

      Toast.show({
        type: 'success',
        text1: 'Send Successful! 🎉',
        text2: `You sent ${params.currency} ${params.amount.toLocaleString(
          'en-US',
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )} to ${params.recipient.email}`,
        position: 'top',
        visibilityTime: 4000,
      });

      router.replace('/');

      return {
        success: true,
        message: 'Send successful',
      };
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Transaction Failed',
        text2: error.response?.data?.message || 'An unexpected error occurred',
        position: 'top',
        visibilityTime: 4000,
      });
      return {
        success: false,
        message:
          error.response?.data?.message || 'An unexpected error occurred',
      };
    } finally {
      setLoading(false);
    }
  };

  return { send, loading };
};
