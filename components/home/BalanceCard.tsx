import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '@/styles/theme';
import { CurrencySelector } from './CurrencySelector';
import { Currency } from '@/lib/currency';

interface BalanceCardProps {
  balances: {
    currency: string;
    amount: number;
    symbol: string;
  }[];
  currencies: Currency[];
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

export const BalanceCard = ({
  balances,
  currencies,
  selectedCurrency,
  onCurrencyChange,
}: BalanceCardProps) => {
  const selectedBalance = balances.find((b) => b.currency === selectedCurrency);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Available Balance</Text>
        <CurrencySelector
          currencies={currencies}
          selectedCurrency={selectedCurrency}
          onSelect={onCurrencyChange}
        />
      </View>

      <Text style={styles.value}>
        {selectedBalance?.symbol}
        {selectedBalance?.amount.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>+$1,234</Text>
          <Text style={styles.statLabel}>Income</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>-$567</Text>
          <Text style={styles.statLabel}>Expenses</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: 16,
    marginBottom: Spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  label: {
    ...Typography.subtitle,
    color: Colors.gray,
  },
  value: {
    ...Typography.heading1,
    color: Colors.black,
    marginBottom: Spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...Typography.heading2,
    color: Colors.black,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.gray,
    marginTop: Spacing.xs,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.md,
  },
});
