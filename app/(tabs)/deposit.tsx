import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Typography } from '@/styles/theme';
import { CurrencySelector } from '@/components/home/CurrencySelector';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { currencies } from '@/lib/currency';
import { useDeposit } from '@/hook/useDeposit';
import Toast from 'react-native-toast-message';
import { CardForm } from '@/components/deposit/CardForm';
import { BankForm } from '@/components/deposit/BankForm';
import { depositStyles } from '@/styles/deposit';

const METHOD_CARD = 'card' as const;
const METHOD_BANK = 'bank' as const;

export default function DepositScreen() {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [method, setMethod] = useState<'card' | 'bank'>(METHOD_CARD);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankRouting, setBankRouting] = useState('');
  const [showCardErrors, setShowCardErrors] = useState(false);
  const [showBankErrors, setShowBankErrors] = useState(false);
  const [showAmountError, setShowAmountError] = useState(false);
  const { deposit, loading, error } = useDeposit();

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted;
  };

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return cleaned;
  };

  const handleCardNumberChange = (text: string) => {
    const formatted = formatCardNumber(text);
    setCardNumber(formatted);
    setShowCardErrors(false);
  };

  const handleExpiryChange = (text: string) => {
    const formatted = formatExpiry(text);
    setCardExpiry(formatted);
    setShowCardErrors(false);
  };

  const handleCvvChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 3);
    setCardCvv(cleaned);
    setShowCardErrors(false);
  };

  const handleBankAccountChange = (text: string) => {
    setBankAccount(text);
    setShowBankErrors(false);
  };

  const handleBankRoutingChange = (text: string) => {
    setBankRouting(text);
    setShowBankErrors(false);
  };

  const handleDeposit = async () => {
    setShowCardErrors(false);
    setShowBankErrors(false);
    setShowAmountError(false);

    let hasErrors = false;

    if (!amount || isNaN(Number(amount))) {
      setShowAmountError(true);
      hasErrors = true;
    } else if (Number(amount) <= 0) {
      setShowAmountError(true);
      hasErrors = true;
    }

    if (method === METHOD_CARD) {
      if (!cardNumber || !cardExpiry || !cardCvv) {
        setShowCardErrors(true);
        hasErrors = true;
      } else if (cardNumber.replace(/\s/g, '').length < 16) {
        setShowCardErrors(true);
        hasErrors = true;
      } else if (cardExpiry.length < 5) {
        setShowCardErrors(true);
        hasErrors = true;
      } else if (cardCvv.length < 3) {
        setShowCardErrors(true);
        hasErrors = true;
      }
    } else if (method === METHOD_BANK) {
      if (!bankAccount || !bankRouting) {
        setShowBankErrors(true);
        hasErrors = true;
      } else if (bankAccount.length < 8) {
        setShowBankErrors(true);
        hasErrors = true;
      } else if (bankRouting.length !== 9) {
        setShowBankErrors(true);
        hasErrors = true;
      }
    }

    if (hasErrors) {
      return;
    }

    const depositResult = await deposit({
      currency: selectedCurrency,
      amount: Number(amount),
      method,
      ...(method === METHOD_CARD
        ? {
            cardNumber,
            expirationDate: cardExpiry,
            secureDigits: cardCvv,
          }
        : {
            bankAccount,
            bankRouting,
          }),
    });

    console.log('result', depositResult);

    if (depositResult.valid) {
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
    } else {
      Toast.show({
        type: 'error',
        text1: 'Deposit Failed',
        text2: depositResult?.message || error || 'Failed to process deposit',
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

  const getInputStyle = (hasError: boolean) => [
    depositStyles.input,
    hasError && depositStyles.inputError,
  ];

  return (
    <View style={depositStyles.container}>
      <TouchableOpacity
        style={depositStyles.backButton}
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
      <View style={depositStyles.card}>
        <Text style={depositStyles.title}>Deposit Funds</Text>
        <View style={depositStyles.methodSelectorWrapper}>
          <TouchableOpacity
            style={[
              depositStyles.methodButton,
              method === METHOD_CARD && depositStyles.methodButtonActive,
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
                depositStyles.methodButtonText,
                method === METHOD_CARD && depositStyles.methodButtonTextActive,
              ]}
            >
              Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              depositStyles.methodButton,
              method === METHOD_BANK && depositStyles.methodButtonActive,
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
                depositStyles.methodButtonText,
                method === METHOD_BANK && depositStyles.methodButtonTextActive,
              ]}
            >
              Bank Account
            </Text>
          </TouchableOpacity>
        </View>

        {method === METHOD_CARD ? (
          <CardForm
            cardNumber={cardNumber}
            cardExpiry={cardExpiry}
            cardCvv={cardCvv}
            showErrors={showCardErrors}
            onCardNumberChange={handleCardNumberChange}
            onExpiryChange={handleExpiryChange}
            onCvvChange={handleCvvChange}
            getInputStyle={getInputStyle}
          />
        ) : (
          <BankForm
            bankAccount={bankAccount}
            bankRouting={bankRouting}
            showErrors={showBankErrors}
            onBankAccountChange={handleBankAccountChange}
            onBankRoutingChange={handleBankRoutingChange}
            getInputStyle={getInputStyle}
          />
        )}

        <View style={depositStyles.amountCurrencyRow}>
          <View style={{ flex: 2, marginRight: Spacing.md }}>
            <Text
              style={{
                ...Typography.subtitle,
                color: Colors.gray,
                marginBottom: Spacing.xs,
                marginTop: Spacing.lg,
                alignSelf: 'flex-start',
              }}
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
              style={{
                ...Typography.subtitle,
                color: Colors.gray,
                marginBottom: Spacing.xs,
                marginTop: Spacing.lg,
                alignSelf: 'flex-start',
              }}
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
        <TouchableOpacity
          style={[
            depositStyles.button,
            loading && depositStyles.buttonDisabled,
          ]}
          onPress={handleDeposit}
          disabled={loading}
        >
          <Text style={depositStyles.buttonText}>
            {loading ? 'Processing...' : 'Deposit'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
