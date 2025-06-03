import { Slot, Redirect } from 'expo-router';
import { useAuth } from '@/components/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/styles/theme';

export default function TabsLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <Slot />
    </SafeAreaView>
  );
}
