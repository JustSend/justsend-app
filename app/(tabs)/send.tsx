import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Colors, Spacing, Typography } from '@/styles/theme';
import { CurrencySelector } from '@/components/home/CurrencySelector';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { currencies } from '@/lib/currency';
import Toast from 'react-native-toast-message';
import { depositStyles } from '@/styles/deposit';
import { useUserSearch, User } from '@/hook/useUserSearch';

export default function SendScreen() {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [showAmountError, setShowAmountError] = useState(false);
  const { searchTerm, setSearchTerm, results, loading } = useUserSearch();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSend = async () => {
    if (!selectedUser) return;
    setShowAmountError(false);

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setShowAmountError(true);
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Send Successful! 🎉',
      text2: `You sent ${selectedCurrency} ${Number(amount).toLocaleString(
        'en-US',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )} to ${selectedUser.email}`,
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
          Recipient
        </Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={[depositStyles.input, styles.searchInput]}
            placeholder="Search by email or alias"
            placeholderTextColor={Colors.gray}
            autoCapitalize="none"
            value={searchTerm}
            onChangeText={(text) => {
              setSearchTerm(text);
              setSelectedUser(null);
            }}
          />
          {loading && (
            <View style={styles.loadingContainer}>
              <Text style={[Typography.caption, { color: Colors.gray }]}>
                Searching...
              </Text>
            </View>
          )}
          {!selectedUser && results.length > 0 && (
            <ScrollView style={styles.resultsContainer}>
              {results.map((user, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.resultItem}
                  onPress={() => {
                    setSelectedUser(user);
                    setSearchTerm(user.email);
                  }}
                >
                  <View>
                    <Text
                      style={[Typography.subtitle, { color: Colors.black }]}
                    >
                      {user.alias}
                    </Text>
                    <Text style={[Typography.caption, { color: Colors.gray }]}>
                      {user.email}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={Colors.gray}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
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
          style={[depositStyles.button, !selectedUser && styles.buttonDisabled]}
          onPress={handleSend}
          disabled={!selectedUser}
        >
          <Text style={depositStyles.buttonText}>Send Money</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    position: 'relative',
    zIndex: 1,
  },
  searchInput: {
    marginBottom: 0,
  },
  loadingContainer: {
    padding: Spacing.sm,
    alignItems: 'center',
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
    elevation: 4,
    zIndex: 2,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
