import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { router } from 'expo-router';
import { GlobalStyles } from '@/styles/globalStyles';
import { Colors } from '@/styles/theme';
import { errorMessages } from '@/lib/fireBaseErrors';

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
        <Text style={styles.appName}>JustSend</Text>
        <Text style={GlobalStyles.title}>Welcome Back</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={GlobalStyles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={GlobalStyles.input}
        />
        <View style={GlobalStyles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} />
        </View>

        {error && <Text style={GlobalStyles.errorText}>{error}</Text>}

        <View style={GlobalStyles.buttonContainer}>
          <Button
            title="Register"
            color={Colors.gray}
            onPress={() => router.navigate('/register')}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: Colors.primary,
  },
});
