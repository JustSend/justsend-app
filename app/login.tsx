import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { login } from '@/lib/authService';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
};

export default LoginScreen;
