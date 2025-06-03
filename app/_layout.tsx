import { Stack } from 'expo-router';
import { AuthProvider } from '@/components/AuthProvider';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/lib/toastConfig';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
      <Toast config={toastConfig} />
    </AuthProvider>
  );
}
