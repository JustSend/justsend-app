import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Typography } from '@/styles/theme';
import { CurrencySelector } from '@/components/home/CurrencySelector';
import { router } from 'expo-router';
import { currencies } from '@/lib/currency';
import { useDeposit } from '@/hook/useDeposit';
import Toast from 'react-native-toast-message';
import { depositStyles } from '@/styles/deposit';

export default function DepositScreen() {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [bankRouting, setBankRouting] = useState('');
  const [showBankErrors, setShowBankErrors] = useState(false);
  const [showAmountError, setShowAmountError] = useState(false);
  const { deposit, loading, error } = useDeposit();

  const handleBankRoutingChange = (text: string) => {
    setBankRouting(text);
    setShowBankErrors(false);
  };

  const handleDeposit = async () => {
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

    if (!bankRouting) {
      setShowBankErrors(true);
      hasErrors = true;
    } else if (bankRouting.length !== 9) {
      setShowBankErrors(true);
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    const depositResult = await deposit({
      currency: selectedCurrency,
      amount: Number(amount),
      bankRouting,
    });

    if (depositResult.success) {
      Toast.show({
        type: 'success',
        text1: 'DEBIN Deposit Successful! 🎉',
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
        text1: 'DEBIN Deposit Failed',
        text2:
          depositResult?.message || error || 'Failed to process DEBIN deposit',
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
      <Text style={depositStyles.title}>DEBIN Deposit</Text>
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
        Enter your routing number for an immediate deposit
      </Text>

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
        Routing Number
      </Text>
      <TextInput
        style={getInputStyle(
          showBankErrors && (!bankRouting || bankRouting.length !== 9)
        )}
        placeholder="Enter routing number"
        placeholderTextColor={Colors.gray}
        keyboardType="numeric"
        value={bankRouting}
        onChangeText={handleBankRoutingChange}
        maxLength={9}
      />

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
        style={[depositStyles.button, loading && depositStyles.buttonDisabled]}
        onPress={handleDeposit}
        disabled={loading}
      >
        <Text style={depositStyles.buttonText}>
          {loading ? 'Processing...' : 'Deposit with DEBIN'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
