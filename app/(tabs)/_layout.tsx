import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';

export default function TabsLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading]);

  if (loading) return null;

  return <Stack />;
}
