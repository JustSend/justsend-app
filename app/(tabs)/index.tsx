import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useAuth } from '@/components/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { router, useLocalSearchParams } from 'expo-router';
import { currencies } from '@/lib/currency';
import { Colors, Spacing } from '@/styles/theme';
import { Header } from '@/components/home/Header';
import { BalanceCard } from '@/components/home/BalanceCard';
import { QuickActions } from '@/components/home/QuickActions';
import { TransactionList } from '@/components/home/TransactionList';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useBalances } from '@/hook/useBalances';

export default function HomeScreen() {
  const { user } = useAuth();
  const params = useLocalSearchParams();
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const { balances, loading, error } = useBalances();

  useEffect(() => {
    if (params.selectedCurrency) {
      setSelectedCurrency(params.selectedCurrency as string);
    }
  }, [params.selectedCurrency]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.primary} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Header email={user?.email} onSignOut={handleSignOut} />
        <View style={styles.content}>
          {loading ? (
            <BalanceCard
              balances={[]}
              currencies={currencies}
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
            />
          ) : error ? (
            <View style={{ padding: 24 }}>
              <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
            </View>
          ) : (
            <BalanceCard
              balances={balances}
              currencies={currencies}
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
            />
          )}
          <QuickActions />
          <TransactionList transactions={[]} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: Spacing.lg,
  },
});
