import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { Colors, Spacing, Typography } from '@/styles/theme';
import { CurrencySelector } from '@/components/home/CurrencySelector';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { currencies } from '@/lib/currency';

export default function WithdrawScreen() {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={Colors.primary} />
      </TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.title}>Withdraw Funds</Text>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <Text style={styles.label}>Currency</Text>
        <CurrencySelector
          currencies={currencies}
          selectedCurrency={selectedCurrency}
          onSelect={setSelectedCurrency}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 24,
    zIndex: 10,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 6,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: Spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    width: '92%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    ...Typography.heading1,
    color: Colors.primary,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  label: {
    ...Typography.subtitle,
    color: Colors.gray,
    marginBottom: Spacing.xs,
    marginTop: Spacing.lg,
    alignSelf: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: Spacing.md,
    backgroundColor: Colors.white,
    fontSize: 18,
    color: Colors.black,
    width: '100%',
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: Spacing.lg,
    alignItems: 'center',
    marginTop: Spacing.xl,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
  },
  buttonText: {
    ...Typography.button,
    color: Colors.white,
    fontSize: 18,
  },
});
