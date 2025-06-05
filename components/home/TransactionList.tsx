import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '@/styles/theme';
import { Transaction } from '@/lib/interfaces';
import TransactionInfo from '@/components/TransactionInfo';

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList = ({
  transactions = [],
}: TransactionListProps) => {
  if (!transactions) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recent Transactions</Text>
        <Text style={{ color: Colors.gray }}>No Transactions</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Transactions</Text>
      {transactions.length === 0 ? (
        <Text style={{ color: Colors.gray }}>No transactions found.</Text>
      ) : (
        transactions.map((transaction) => (
          <TransactionInfo key={transaction.id} transaction={transaction} />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.heading2,
    marginBottom: Spacing.md,
  },
});
