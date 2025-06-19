import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { router } from 'expo-router';
import { Colors } from '@/styles/theme';
import { apiPublic } from '@/lib/api';
import { GlobalStyles } from '@/styles/globalStyles';
import { Logo } from '@/components/Logo';
import { errorMessages, extractCodeFromMessage } from '@/lib/fireBaseErrors';
import Toast from 'react-native-toast-message';

function validateEmail(email: string) {
  return /^[^@]+@[^@]+\.[^@]+$/.test(email);
}

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailTouched, setEmailTouched] = useState(false);

  function handleEmailChange(text: string) {
    setEmail(text);
    if (emailTouched) {
      if (!validateEmail(text)) {
        setError('Please enter a valid email address.');
      } else {
        setError(null);
      }
    }
  }

  async function handleRegister() {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = {
        uid: userCredential.user.uid,
        email: email,
      };
      await apiPublic.post(`/api/user/register`, user);
      router.navigate('/login');
      Toast.show({
        type: 'success',
        text1: 'Registration successful!',
        text2: 'You can now sign in.',
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
      });
    } catch (err: any) {
      console.log(err);
      const code = err.code || extractCodeFromMessage(err.message);
      setError(errorMessages[code] || 'An error occurred. Please try again.');
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: errorMessages[code] || 'An error occurred. Please try again.',
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={GlobalStyles.container}
    >
      <View style={GlobalStyles.card}>
        <Logo />
        <Text style={GlobalStyles.title}>Create Account</Text>
        <Text style={GlobalStyles.subtitle}>
          Join JustSend to start sending and receiving payments securely
        </Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
          onBlur={() => {
            setEmailTouched(true);
            if (!validateEmail(email)) {
              setError('Please enter a valid email address.');
            } else {
              setError(null);
            }
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          style={GlobalStyles.input}
          placeholderTextColor={Colors.muted}
          testID="Email Input"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={GlobalStyles.input}
          placeholderTextColor={Colors.muted}
          testID="Password Input"
        />

        <TouchableOpacity
          disabled={loading}
          style={[
            GlobalStyles.primaryButton,
            GlobalStyles.buttonContainer,
            loading && { opacity: 0.6 },
          ]}
          onPress={handleRegister}
          testID="Register Button"
        >
          <Text style={GlobalStyles.buttonText}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        {error && (
          <Text style={GlobalStyles.errorText} testID="Error Message">
            {error}
          </Text>
        )}

        <View style={GlobalStyles.divider}>
          <View style={GlobalStyles.dividerLine} />
          <Text style={GlobalStyles.dividerText}>or</Text>
          <View style={GlobalStyles.dividerLine} />
        </View>

        <TouchableOpacity
          disabled={loading}
          style={[
            GlobalStyles.secondaryButton,
            GlobalStyles.buttonContainer,
            loading && { opacity: 0.6 },
          ]}
          onPress={() => {
            setError(null);
            Keyboard.dismiss();
            router.navigate('/login');
          }}
          testID="Sign In Button"
        >
          <Text style={GlobalStyles.secondaryButtonText}>Sign In</Text>
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
