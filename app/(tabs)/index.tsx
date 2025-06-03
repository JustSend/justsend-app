import { View, ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '@/components/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { router } from 'expo-router';
import { balances, currencies, mockTransactions } from '@/lib/mockdata';
import { Colors, Spacing } from '@/styles/theme';
import { Header } from '@/components/home/Header';
import { BalanceCard } from '@/components/home/BalanceCard';
import { QuickActions } from '@/components/home/QuickActions';
import { TransactionList } from '@/components/home/TransactionList';
import { useState } from 'react';

export default function HomeScreen() {
  const { user } = useAuth();
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const quickActions = [
    {
      title: 'Send Money',
      icon: 'send-outline',
      color: Colors.primary,
      onPress: () => {},
    },
    {
      title: 'Request Money',
      icon: 'download-outline',
      color: Colors.success,
      onPress: () => {},
    },
    {
      title: 'Pay Bills',
      icon: 'receipt-outline',
      color: Colors.warning,
      onPress: () => {},
    },
    {
      title: 'Top Up',
      icon: 'add-circle-outline',
      color: Colors.secondary,
      onPress: () => {},
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Header email={user?.email} onSignOut={handleSignOut} />
      <View style={styles.content}>
        <BalanceCard
          balances={balances}
          currencies={currencies}
          selectedCurrency={selectedCurrency}
          onCurrencyChange={setSelectedCurrency}
        />
        <QuickActions actions={quickActions} />
        <TransactionList transactions={mockTransactions} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
  },
});
