import { useState } from 'react';
import { apiPrivate } from '@/lib/api';
import { User } from '@/lib/user';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

interface SendParams {
  recipient: User;
  amount: number;
  currency: string;
}

export function useSend() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async ({ recipient, amount, currency }: SendParams) => {
    if (!recipient || !amount || !currency) {
      setError('Missing required fields');
      return;
    }

    setLoading(true);
    try {
      await apiPrivate.post('/api/transaction/send', {
        recipientId: recipient.id,
        amount,
        currency,
      });

      Toast.show({
        type: 'success',
        text1: 'Send Successful! 🎉',
        text2: `You sent ${currency} ${amount.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} to ${recipient.email}`,
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });

      router.replace('/');
    } catch (err) {
      setError('Failed to send money');
      console.error('Error sending money:', err);
      Toast.show({
        type: 'error',
        text1: 'Send Failed',
        text2: 'There was an error processing your transaction',
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    send,
    loading,
    error,
  };
}
