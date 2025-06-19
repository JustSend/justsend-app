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
  Alert,
} from 'react-native';
import { useState } from 'react';
import { Colors, Spacing, Typography } from '@/styles/theme';
import { CurrencySelector } from '@/components/home/CurrencySelector';
import { currencies } from '@/lib/currency';
import { depositStyles } from '@/styles/deposit';
import { useWithdraw } from '../hooks/useWithdraw';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export default function WithdrawScreen() {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [showAmountError, setShowAmountError] = useState(false);
  const [routingNumber, setRoutingNumber] = useState('');
  const [showRoutingError, setShowRoutingError] = useState(false);
  const { withdraw, isLoading, error } = useWithdraw();

  const getInputStyle = (hasError: boolean) => [
    depositStyles.input,
    hasError && depositStyles.inputError,
  ];

  const handleWithdraw = async () => {
    if (!amount || isNaN(parseFloat(amount))) {
      setShowAmountError(true);
      return;
    }

    if (!routingNumber) {
      setShowRoutingError(true);
      return;
    }

    try {
      const result = await withdraw({
        amount,
        currency: selectedCurrency,
        routingNumber,
      });

      if (result.success) {
        Toast.show({
          type: 'success',
          text1: 'Withdrawal Successful! 🎉',
          text2: `You withdrew ${selectedCurrency} ${parseFloat(
            amount
          ).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
          position: 'top',
          visibilityTime: 4000,
        });
        router.replace('/');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Withdrawal Failed',
          text2: result.message || 'Failed to process withdrawal',
          position: 'top',
          visibilityTime: 4000,
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Withdrawal Failed',
        text2: error || 'An unexpected error occurred',
        position: 'top',
        visibilityTime: 4000,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View
        style={[depositStyles.container, isMobile && styles.mobileContainer]}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <View style={styles.contentContainer}>
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
                  testID="Amount Input"
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

            <View style={{ marginTop: Spacing.lg }}>
              <Text
                style={[
                  Typography.subtitle,
                  {
                    color: Colors.gray,
                    marginBottom: Spacing.xs,
                    alignSelf: 'flex-start',
                  },
                ]}
              >
                Bank Routing Number
              </Text>
              <TextInput
                style={getInputStyle(showRoutingError)}
                placeholder="Enter routing number"
                placeholderTextColor={Colors.gray}
                keyboardType="numeric"
                value={routingNumber}
                onChangeText={(text) => {
                  setRoutingNumber(text);
                  setShowRoutingError(false);
                }}
                testID="Routing Input"
              />
            </View>

            <TouchableOpacity
              style={[
                depositStyles.button,
                isLoading && depositStyles.buttonDisabled,
              ]}
              onPress={handleWithdraw}
              disabled={isLoading}
            >
              <Text style={depositStyles.buttonText}>
                {isLoading ? 'Processing...' : 'Withdraw'}
              </Text>
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
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: isMobile ? 100 : 200,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
});
