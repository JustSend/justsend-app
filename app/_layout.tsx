import { Stack } from 'expo-router';
import { AuthProvider } from '@/components/AuthProvider';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
