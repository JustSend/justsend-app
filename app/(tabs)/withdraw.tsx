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
import { currencies } from '@/lib/mockdata';

export default function WithdrawScreen() {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    justifyContent: 'center',
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
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: Spacing.md,
    backgroundColor: Colors.white,
    fontSize: 18,
    color: Colors.black,
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
  },
  buttonText: {
    ...Typography.button,
    color: Colors.white,
    fontSize: 18,
  },
});
