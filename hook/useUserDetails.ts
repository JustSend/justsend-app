import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { apiPrivate } from '@/lib/api';
import { user } from '@/lib/user';

interface UserDetails {
  email: string;
  alias: string;
}

export function useUserDetails() {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userInfo = await apiPrivate.get<user>('/api/wallet/info');
        setUserDetails(userInfo.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch user details');
        console.error('Error fetching user details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user]);

  return { userDetails, loading, error };
}
