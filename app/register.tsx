import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { router } from 'expo-router';
import { Colors } from '@/styles/theme';
import Toast from 'react-native-toast-message';
import { apiPublic } from '@/lib/api';
import { GlobalStyles } from '@/styles/globalStyles';
import { Logo } from '@/components/Logo';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      await apiPublic.post(`/user/${uid}`);

      Toast.show({
        type: 'success',
        text1: 'Registration successful!',
      });

      router.navigate('/login');
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Registration failed',
        text2: err.message,
      });
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
          onPress={handleRegister}
        >
          <Text style={GlobalStyles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <View style={GlobalStyles.divider}>
          <View style={GlobalStyles.dividerLine} />
          <Text style={GlobalStyles.dividerText}>or</Text>
          <View style={GlobalStyles.dividerLine} />
        </View>

        <TouchableOpacity
          style={[GlobalStyles.secondaryButton, GlobalStyles.buttonContainer]}
          onPress={() => router.navigate('/login')}
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
