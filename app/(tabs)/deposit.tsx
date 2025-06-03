import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Colors, Spacing, Typography } from '@/styles/theme';
import { CurrencySelector } from '@/components/home/CurrencySelector';
import { currencies } from '@/lib/mockdata';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const METHOD_CARD = 'card';
const METHOD_BANK = 'bank';

export default function DepositScreen() {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [method, setMethod] = useState(METHOD_CARD);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankRouting, setBankRouting] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          if (router.canGoBack?.()) {
            router.back();
          } else {
            router.replace('/');
          }
        }}
      >
        <Ionicons name="chevron-back" size={24} color={Colors.primary} />
      </TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.title}>Deposit Funds</Text>
        <View style={styles.methodSelectorWrapper}>
          <TouchableOpacity
            style={[
              styles.methodButton,
              method === METHOD_CARD && styles.methodButtonActive,
            ]}
            onPress={() => setMethod(METHOD_CARD)}
          >
            <Ionicons
              name="card-outline"
              size={20}
              color={method === METHOD_CARD ? Colors.primary : Colors.gray}
            />
            <Text
              style={[
                styles.methodButtonText,
                method === METHOD_CARD && styles.methodButtonTextActive,
              ]}
            >
              Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.methodButton,
              method === METHOD_BANK && styles.methodButtonActive,
            ]}
            onPress={() => setMethod(METHOD_BANK)}
          >
            <Ionicons
              name="business-outline"
              size={20}
              color={method === METHOD_BANK ? Colors.primary : Colors.gray}
            />
            <Text
              style={[
                styles.methodButtonText,
                method === METHOD_BANK && styles.methodButtonTextActive,
              ]}
            >
              Bank Account
            </Text>
          </TouchableOpacity>
        </View>
        {method === METHOD_CARD && (
          <>
            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={setCardNumber}
              maxLength={19}
            />
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: Spacing.md }}>
                <Text style={styles.label}>Expiry</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  keyboardType="numeric"
                  value={cardExpiry}
                  onChangeText={setCardExpiry}
                  maxLength={5}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  keyboardType="numeric"
                  value={cardCvv}
                  onChangeText={setCardCvv}
                  maxLength={4}
                />
              </View>
            </View>
          </>
        )}
        {method === METHOD_BANK && (
          <>
            <Text style={styles.label}>Account Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Account Number"
              keyboardType="numeric"
              value={bankAccount}
              onChangeText={setBankAccount}
            />
            <Text style={styles.label}>Routing Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Routing Number"
              keyboardType="numeric"
              value={bankRouting}
              onChangeText={setBankRouting}
            />
          </>
        )}
        {/* Amount and Currency side by side */}
        <View style={styles.amountCurrencyRow}>
          <View style={{ flex: 2, marginRight: Spacing.md }}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Currency</Text>
            <CurrencySelector
              currencies={currencies}
              selectedCurrency={selectedCurrency}
              onSelect={setSelectedCurrency}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Deposit</Text>
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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 32,
    padding: Spacing.xl,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    width: '98%',
    maxWidth: 440,
    alignItems: 'center',
  },
  title: {
    ...Typography.heading1,
    color: Colors.primary,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  methodSelectorWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 16,
    marginBottom: Spacing.lg,
    padding: 4,
    width: '100%',
  },
  methodButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  methodButtonActive: {
    backgroundColor: Colors.white,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  methodButtonText: {
    ...Typography.subtitle,
    color: Colors.gray,
    marginLeft: 8,
  },
  methodButtonTextActive: {
    color: Colors.primary,
    fontWeight: 'bold',
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
  row: {
    flexDirection: 'row',
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
  amountCurrencyRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
    marginTop: Spacing.lg,
  },
});
