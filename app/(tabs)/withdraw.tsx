import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useState } from 'react';
import { Colors, Spacing, Typography } from '@/styles/theme';
import { CurrencySelector } from '@/components/home/CurrencySelector';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { currencies } from '@/lib/currency';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export default function WithdrawScreen() {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.card, isMobile && styles.mobileCard]}>
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
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isMobile ? Colors.white : Colors.background,
    padding: isMobile ? Spacing.md : Spacing.xl,
    paddingTop: isMobile ? Spacing.xl * 2 : Spacing.xl * 3,
  },
  backButton: {
    position: 'absolute',
    top: isMobile ? Spacing.xl : Spacing.xl * 2,
    left: isMobile ? Spacing.xl : Spacing.xl,
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
    alignSelf: 'center',
  },
  mobileCard: {
    width: '100%',
    maxWidth: '100%',
    borderRadius: 0,
    shadowOpacity: 0,
    elevation: 0,
    padding: Spacing.md,
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
    minHeight: 80,
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
    minHeight: 80,
  },
  buttonText: {
    ...Typography.button,
    color: Colors.white,
    fontSize: 20,
  },
});
