import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Typography } from '@/styles/theme';
import { CurrencySelector } from '@/components/home/CurrencySelector';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { currencies } from '@/lib/currency';
import Toast from 'react-native-toast-message';
import { depositStyles } from '@/styles/deposit';

export default function SendScreen() {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [email, setEmail] = useState('');
  const [showEmailError, setShowEmailError] = useState(false);
  const [showAmountError, setShowAmountError] = useState(false);

  const handleSend = async () => {
    setShowEmailError(false);
    setShowAmountError(false);

    let hasErrors = false;

    if (!amount || isNaN(Number(amount))) {
      setShowAmountError(true);
      hasErrors = true;
    } else if (Number(amount) <= 0) {
      setShowAmountError(true);
      hasErrors = true;
    }

    if (!email || !email.includes('@')) {
      setShowEmailError(true);
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    // TODO: Implement send logic
    Toast.show({
      type: 'success',
      text1: 'Send Successful! 🎉',
      text2: `You sent ${selectedCurrency} ${Number(amount).toLocaleString(
        'en-US',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )} to ${email}`,
      position: 'top',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 50,
      bottomOffset: 40,
    });

    router.replace('/');
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
        <Text style={depositStyles.title}>Send Money</Text>
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
          Send money to another user
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
          Recipient Email
        </Text>
        <TextInput
          style={getInputStyle(showEmailError)}
          placeholder="Enter recipient's email"
          placeholderTextColor={Colors.gray}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setShowEmailError(false);
          }}
        />

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

        <TouchableOpacity style={[depositStyles.button]} onPress={handleSend}>
          <Text style={depositStyles.buttonText}>Send Money</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
