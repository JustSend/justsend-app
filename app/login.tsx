import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { router } from 'expo-router';
import { GlobalStyles } from '@/styles/globalStyles';
import { Colors } from '@/styles/theme';
import { errorMessages } from '@/lib/fireBaseErrors';
import { Logo } from '@/components/Logo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.navigate('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        const firebaseErrorMatch = error.message.match(/\(auth\/[a-z-]+\)/);
        if (firebaseErrorMatch) {
          const errorCode = firebaseErrorMatch[0].replace(/[()]/g, '');
          setError(
            errorMessages[errorCode] || 'An error occurred. Please try again.'
          );
        } else {
          setError(error.message);
        }
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={GlobalStyles.container}
    >
      <View style={GlobalStyles.card}>
        <Logo />
        <Text style={GlobalStyles.title}>Welcome Back</Text>
        <Text style={GlobalStyles.subtitle}>
          Sign in to manage your payments and transfers
        </Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={GlobalStyles.input}
          placeholderTextColor={Colors.muted}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={GlobalStyles.input}
          placeholderTextColor={Colors.muted}
        />

        <TouchableOpacity
          style={[GlobalStyles.primaryButton, GlobalStyles.buttonContainer]}
          onPress={handleLogin}
        >
          <Text style={GlobalStyles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        {error && <Text style={GlobalStyles.errorText}>{error}</Text>}

        <View style={GlobalStyles.divider}>
          <View style={GlobalStyles.dividerLine} />
          <Text style={GlobalStyles.dividerText}>or</Text>
          <View style={GlobalStyles.dividerLine} />
        </View>

        <TouchableOpacity
          style={[GlobalStyles.secondaryButton, GlobalStyles.buttonContainer]}
          onPress={() => router.navigate('/register')}
        >
          <Text style={GlobalStyles.secondaryButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: Colors.primary,
  },
});
