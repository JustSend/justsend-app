import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'expo-router';

export default function Login() {
  const { login, token } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      router.replace('/');
    }
  }, [router, token]);

  async function handleLogin() {
    try {
      setError(null);
      await login(email, password);
      router.replace('/'); // Redirect after login
    } catch (e) {
      setError('Invalid credentials');
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 justify-center bg-white px-5"
    >
      <View className="bg-gray-100 rounded-lg p-6 shadow-md">
        <Text className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login
        </Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          className="h-12 border border-gray-300 rounded-md px-3 mb-4 bg-white text-base"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType="password"
          className="h-12 border border-gray-300 rounded-md px-3 mb-4 bg-white text-base"
        />

        {error && (
          <Text className="text-red-600 mb-4 text-center">{error}</Text>
        )}

        <Button title="Login" onPress={handleLogin} />
      </View>
    </KeyboardAvoidingView>
  );
}
