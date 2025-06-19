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
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
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
  const [showAmountError, setShowAmountError] = useState(false);
  const {
    searchTerm,
    setSearchTerm,
    results,
    loading: searchLoading,
  } = useUserSearch();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
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

  const handleSend = async () => {
    if (!selectedUser) return;
    setShowAmountError(false);

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setShowAmountError(true);
      return;
    }

    try {
      const result = await send({
        recipient: selectedUser,
        amount: Number(amount),
        currency: selectedCurrency,
      });

      if (!result.success) {
        return;
      }
    } catch {
      return;
    }
  };

  const getInputStyle = (hasError: boolean) => [
    depositStyles.input,
    hasError && depositStyles.inputError,
  ];

  useEffect(() => {
    if ((isFocused || showResults) && !selectedUser && results.length > 0) {
      animateResults(true);
    } else {
      animateResults(false);
    }
  }, [isFocused, showResults, selectedUser, results.length, animateResults]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View
        style={[depositStyles.container, isMobile && styles.mobileContainer]}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: isMobile ? 100 : 200 }}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
        >
          <View style={[depositStyles.card, isMobile && styles.mobileCard]}>
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
              Recipient
            </Text>
            <View style={styles.searchContainer}>
              {selectedUser ? (
                <View
                  style={[depositStyles.input, styles.selectedUserContainer]}
                >
                  <View>
                    <Text
                      style={[Typography.subtitle, { color: Colors.black }]}
                    >
                      {selectedUser.email}
                    </Text>
                    <Text style={[Typography.caption, { color: Colors.gray }]}>
                      {selectedUser.alias}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedUser(null);
                      setSearchTerm('');
                    }}
                  >
                    <Ionicons
                      name="close-circle"
                      size={20}
                      color={Colors.gray}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <TextInput
                  style={[depositStyles.input, styles.searchInput]}
                  placeholder="Search by email or alias"
                  placeholderTextColor={Colors.gray}
                  autoCapitalize="none"
                  value={searchTerm}
                  onFocus={() => {
                    setIsFocused(true);
                    setShowResults(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setIsFocused(false);
                    }, 200);
                  }}
                  onChangeText={(text) => {
                    setSearchTerm(text);
                    setSelectedUser(null);
                    setShowResults(true);
                  }}
                  testID="Recipient Input"
                />
              )}
              {searchLoading && isFocused && (
                <View style={styles.loadingContainer}>
                  <Text style={[Typography.caption, { color: Colors.gray }]}>
                    Searching...
                  </Text>
                </View>
              )}
              {(isFocused || showResults) &&
                !selectedUser &&
                results.length > 0 && (
                  <View style={styles.resultsContainer}>
                    {results.map((user, index) => (
                      <TouchableOpacity key={index} style={styles.resultItem}>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={[
                              Typography.subtitle,
                              { color: Colors.black },
                            ]}
                          >
                            {user.email}
                          </Text>
                          <Text
                            style={[Typography.caption, { color: Colors.gray }]}
                          >
                            {user.alias}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.arrowContainer}
                          onPress={() => {
                            setSelectedUser(user);
                            setSearchTerm(user.email);
                            setIsFocused(false);
                            setShowResults(false);
                          }}
                          activeOpacity={0.7}
                        >
                          <Ionicons
                            name="chevron-forward"
                            size={24}
                            color={Colors.primary}
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
            </View>

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

            <TouchableOpacity
              style={[
                depositStyles.button,
                (!selectedUser || sendLoading) && styles.buttonDisabled,
              ]}
              onPress={handleSend}
              disabled={!selectedUser || sendLoading}
              testID="Send Button"
            >
              <Text style={depositStyles.buttonText}>
                {sendLoading ? 'Sending...' : 'Send Money'}
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
    paddingTop: Spacing.xl * 2,
  },
  mobileCard: {
    width: '100%',
    maxWidth: '100%',
    borderRadius: 0,
    shadowOpacity: 0,
    elevation: 0,
    padding: Spacing.md,
  },
  searchContainer: {
    position: 'relative',
    zIndex: 1000,
    minHeight: 50,
    elevation: 1,
  },
  searchInput: {
    marginBottom: 0,
  },
  loadingContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    padding: Spacing.sm,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1001,
  },
  resultsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: 12,
    maxHeight: 200,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1001,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    minHeight: 50,
    backgroundColor: Colors.white,
    elevation: 1,
  },
  arrowContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGray + '20',
    borderRadius: 20,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  selectedUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
});
