import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '@/styles/theme';

interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: 'income' | 'payment';
}

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Transactions</Text>
      {transactions.map((transaction) => (
        <View key={transaction.id} style={styles.transactionCard}>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>{transaction.title}</Text>
            <Text style={styles.transactionDate}>{transaction.date}</Text>
          </View>
          <Text
            style={[
              styles.transactionAmount,
              {
                color:
                  transaction.type === 'income' ? Colors.success : Colors.error,
              },
            ]}
          >
            {transaction.type === 'income' ? '+' : '-'}
            {Math.abs(transaction.amount).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </Text>
        </View>
      ))}
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
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: 12,
    marginBottom: Spacing.sm,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    ...Typography.subtitle,
    color: Colors.black,
  },
  transactionDate: {
    ...Typography.caption,
    color: Colors.gray,
    marginTop: 2,
  },
  transactionAmount: {
    ...Typography.subtitle,
    fontWeight: '600',
  },
});
