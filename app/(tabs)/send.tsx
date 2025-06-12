import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { Colors, Spacing, Typography } from '@/styles/theme';
import { CurrencySelector } from '@/components/home/CurrencySelector';
import { currencies } from '@/lib/currency';
import { depositStyles } from '@/styles/deposit';
import { useUserSearch } from '@/hook/useUserSearch';
import { User } from '@/lib/user';
import { useSend } from '@/hook/useSend';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export default function SendScreen() {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [recipient, setRecipient] = useState('');
  const [showAmountError, setShowAmountError] = useState(false);
  const [showRecipientError, setShowRecipientError] = useState(false);
  const { results } = useUserSearch();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const { send, loading: sendLoading } = useSend();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-10)).current;

  const animateResults = useCallback(
    (show: boolean) => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: show ? 1 : 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: show ? 0 : -10,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    },
    [fadeAnim, slideAnim]
  );

  const getInputStyle = (hasError: boolean) => [
    depositStyles.input,
    hasError && depositStyles.inputError,
  ];

  useEffect(() => {
    if (isFocused && !selectedUser && results.length > 0) {
      animateResults(true);
    } else {
      animateResults(false);
    }
  }, [isFocused, selectedUser, results.length, animateResults]);

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
              style={getInputStyle(showRecipientError)}
              placeholder="Enter recipient's email"
              placeholderTextColor={Colors.gray}
              keyboardType="email-address"
              autoCapitalize="none"
              value={recipient}
              onChangeText={(text) => {
                setRecipient(text);
                setShowRecipientError(false);
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

            <TouchableOpacity style={depositStyles.button}>
              <Text style={depositStyles.buttonText}>Send Money</Text>
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
