import { Stack } from 'expo-router';
import { AuthProvider } from '@/components/AuthProvider';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/lib/toastConfig';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
        <Toast config={toastConfig} />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
