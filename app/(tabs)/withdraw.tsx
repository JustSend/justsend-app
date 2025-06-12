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
import { depositStyles } from '@/styles/deposit';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export default function WithdrawScreen() {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [showAmountError, setShowAmountError] = useState(false);

  const getInputStyle = (hasError: boolean) => [
    depositStyles.input,
    hasError && depositStyles.inputError,
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View
        style={[depositStyles.container, isMobile && styles.mobileContainer]}
      >
        <TouchableOpacity
          style={[
            depositStyles.backButton,
            isMobile && styles.mobileBackButton,
          ]}
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
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: isMobile ? 100 : 200 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <View style={[depositStyles.card, isMobile && styles.mobileCard]}>
            <Text style={depositStyles.title}>Withdraw Funds</Text>
            <Text
              style={[
                Typography.subtitle,
                {
                  color: Colors.gray,
                  marginBottom: Spacing.lg,
                  textAlign: 'center',
                },
              ]}
            >
              Withdraw money to your bank account
            </Text>

            <View style={depositStyles.amountCurrencyRow}>
              <View style={{ flex: 2, marginRight: Spacing.md }}>
                <Text
                  style={[
                    Typography.subtitle,
                    {
                      color: Colors.gray,
                      marginBottom: Spacing.xs,
                      marginTop: Spacing.lg,
                      alignSelf: 'flex-start',
                    },
                  ]}
                >
                  Amount
                </Text>
                <TextInput
                  style={getInputStyle(showAmountError)}
                  placeholder="Enter amount"
                  placeholderTextColor={Colors.gray}
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={(text) => {
                    setAmount(text);
                    setShowAmountError(false);
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    Typography.subtitle,
                    {
                      color: Colors.gray,
                      marginBottom: Spacing.xs,
                      marginTop: Spacing.lg,
                      alignSelf: 'flex-start',
                    },
                  ]}
                >
                  Currency
                </Text>
                <CurrencySelector
                  currencies={currencies}
                  selectedCurrency={selectedCurrency}
                  onSelect={setSelectedCurrency}
                />
              </View>
            </View>

            <TouchableOpacity style={depositStyles.button}>
              <Text style={depositStyles.buttonText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mobileContainer: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    paddingTop: Spacing.xl * 2,
  },
  mobileBackButton: {
    top: Spacing.xl,
    left: Spacing.md,
  },
  mobileCard: {
    width: '100%',
    maxWidth: '100%',
    borderRadius: 0,
    shadowOpacity: 0,
    elevation: 0,
    padding: Spacing.md,
  },
});
