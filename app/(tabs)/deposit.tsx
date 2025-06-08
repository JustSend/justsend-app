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
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { currencies } from '@/lib/currency';
import { useDeposit } from '@/hook/useDeposit';
import { useCardValidation } from '@/hook/useCardValidation';
import Toast from 'react-native-toast-message';

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
  const [cardError, setCardError] = useState('');
  const [bankError, setBankError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [showCardErrors, setShowCardErrors] = useState(false);
  const [showBankErrors, setShowBankErrors] = useState(false);
  const [showAmountError, setShowAmountError] = useState(false);
  const {
    deposit,
    loading: depositLoading,
    error: depositError,
  } = useDeposit();
  const {
    validateCard,
    loading: validationLoading,
    error: validationError,
  } = useCardValidation();

  const handleDeposit = async () => {
    // Reset errors
    setCardError('');
    setBankError('');
    setAmountError('');
    setShowCardErrors(false);
    setShowBankErrors(false);
    setShowAmountError(false);

    let hasErrors = false;
    let paymentToken: string | undefined;

    // Validate amount
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setAmountError('Please enter a valid amount');
      setShowAmountError(true);
      hasErrors = true;
    }

    if (method === METHOD_CARD) {
      if (!cardNumber || !cardExpiry || !cardCvv) {
        setCardError('Please fill in all card details');
        setShowCardErrors(true);
        hasErrors = true;
      } else {
        const validationResult = await validateCard({
          cardNumber,
          expirationDate: cardExpiry,
          secureDigits: cardCvv,
        });

        if (!validationResult.valid) {
          setCardError(validationResult.message);
          setShowCardErrors(true);
          hasErrors = true;
        } else {
          paymentToken = validationResult.token;
        }
      }
    } else if (method === METHOD_BANK) {
      if (!bankAccount || !bankRouting) {
        setBankError('Please fill in all bank account details');
        setShowBankErrors(true);
        hasErrors = true;
      }
    }

    if (hasErrors) {
      const errorMessage = validationError || cardError;
      if (errorMessage) {
        Toast.show({
          type: 'error',
          text1: 'Deposit Failed',
          text2: errorMessage,
          position: 'top',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 50,
          bottomOffset: 40,
          props: {
            style: {
              backgroundColor: Colors.error,
              borderRadius: 12,
              padding: 16,
            },
            text1Style: {
              fontSize: 16,
              fontWeight: 'bold',
              color: Colors.white,
            },
            text2Style: {
              fontSize: 14,
              color: Colors.white,
              marginTop: 4,
            },
          },
        });
      }
      return;
    }

    const success = await deposit({
      currency: selectedCurrency,
      amount: Number(amount),
      token: paymentToken,
    });

    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Deposit Successful! 🎉',
        text2: `Your wallet has been credited with ${selectedCurrency} ${Number(
          amount
        ).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
        props: {
          style: {
            backgroundColor: Colors.success,
            borderRadius: 12,
            padding: 16,
          },
          text1Style: {
            fontSize: 16,
            fontWeight: 'bold',
            color: Colors.white,
          },
          text2Style: {
            fontSize: 14,
            color: Colors.white,
            marginTop: 4,
          },
        },
      });

      router.replace({
        pathname: '/',
        params: { selectedCurrency },
      });
    } else if (depositError) {
      Toast.show({
        type: 'error',
        text1: 'Deposit Failed',
        text2: depositError,
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
        props: {
          style: {
            backgroundColor: Colors.error,
            borderRadius: 12,
            padding: 16,
          },
          text1Style: {
            fontSize: 16,
            fontWeight: 'bold',
            color: Colors.white,
          },
          text2Style: {
            fontSize: 14,
            color: Colors.white,
            marginTop: 4,
          },
        },
      });
    }
  };

  const loading = depositLoading || validationLoading;
  const error = depositError || validationError;

  const getInputStyle = (hasError: boolean) => [
    styles.input,
    hasError && styles.inputError,
  ];

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
              style={getInputStyle(showCardErrors && !cardNumber)}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor={Colors.gray}
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={(text) => {
                setCardNumber(text);
                setCardError('');
                setShowCardErrors(false);
              }}
              maxLength={19}
            />
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: Spacing.md }}>
                <Text style={styles.label}>Expiry</Text>
                <TextInput
                  style={getInputStyle(showCardErrors && !cardExpiry)}
                  placeholder="MM/YY"
                  placeholderTextColor={Colors.gray}
                  keyboardType="numeric"
                  value={cardExpiry}
                  onChangeText={(text) => {
                    setCardExpiry(text);
                    setCardError('');
                    setShowCardErrors(false);
                  }}
                  maxLength={5}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  style={getInputStyle(showCardErrors && !cardCvv)}
                  placeholder="123"
                  placeholderTextColor={Colors.gray}
                  keyboardType="numeric"
                  value={cardCvv}
                  onChangeText={(text) => {
                    setCardCvv(text);
                    setCardError('');
                    setShowCardErrors(false);
                  }}
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
              style={getInputStyle(showBankErrors && !bankAccount)}
              placeholder="Account Number"
              placeholderTextColor={Colors.gray}
              keyboardType="numeric"
              value={bankAccount}
              onChangeText={(text) => {
                setBankAccount(text);
                setBankError('');
                setShowBankErrors(false);
              }}
            />
            <Text style={styles.label}>Routing Number</Text>
            <TextInput
              style={getInputStyle(showBankErrors && !bankRouting)}
              placeholder="Routing Number"
              placeholderTextColor={Colors.gray}
              keyboardType="numeric"
              value={bankRouting}
              onChangeText={(text) => {
                setBankRouting(text);
                setBankError('');
                setShowBankErrors(false);
              }}
            />
          </>
        )}
        <View style={styles.amountCurrencyRow}>
          <View style={{ flex: 2, marginRight: Spacing.md }}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={getInputStyle(showAmountError)}
              placeholder="Enter amount"
              placeholderTextColor={Colors.gray}
              keyboardType="numeric"
              value={amount}
              onChangeText={(text) => {
                setAmount(text);
                setAmountError('');
                setShowAmountError(false);
              }}
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
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleDeposit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Processing...' : 'Deposit'}
          </Text>
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
  errorBanner: {
    backgroundColor: Colors.error,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  errorIcon: {
    marginRight: Spacing.sm,
    marginTop: 2,
  },
  errorContent: {
    flex: 1,
  },
  errorBannerText: {
    color: Colors.white,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  errorMessage: {
    ...Typography.body,
    color: Colors.error,
    flex: 1,
  },
  inputError: {
    borderColor: Colors.error,
    borderWidth: 1,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
