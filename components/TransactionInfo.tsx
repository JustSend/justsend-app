import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '@/styles/theme';
import { Transaction } from '@/lib/interfaces';

interface TransactionInfoProps {
  transaction: Transaction;
}

export default function TransactionInfo({ transaction }: TransactionInfoProps) {
  const getTransactionDetails = (type: Transaction['type']) => {
    switch (type) {
      case 'SEND':
        return { color: Colors.error, sign: '-', emoji: '↗️' };
      case 'RECEIVE':
        return { color: Colors.success, sign: '+', emoji: '↙️' };
      case 'DEPOSIT':
        return { color: Colors.success, sign: '+', emoji: '💰' };
      case 'WITHDRAW':
        return { color: Colors.error, sign: '-', emoji: '💸' };
      default:
        return { color: Colors.black, sign: '', emoji: '💳' };
    }
  };

  const { color, sign, emoji } = getTransactionDetails(transaction.type);
  const showEmail =
    transaction.type === 'SEND' || transaction.type === 'RECEIVE';

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <View style={styles.titleRow}>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={styles.title}>
            {showEmail
              ? `${transaction.type} ${transaction.email}`
              : transaction.type}
          </Text>
        </View>
        <Text style={styles.date}>
          {new Date(transaction.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={[styles.amount, { color }]}>
          {sign}{' '}
          {transaction.amount.toLocaleString('en-US', {
            style: 'currency',
            currency: transaction.currency,
          })}
        </Text>
        <Text style={styles.currency}>{transaction.currency}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: Spacing.sm,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  leftContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  emoji: {
    fontSize: 20,
    marginRight: Spacing.xs,
  },
  title: {
    ...Typography.subtitle,
    color: Colors.black,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  date: {
    ...Typography.caption,
    color: Colors.gray,
  },
  amount: {
    ...Typography.subtitle,
    marginBottom: Spacing.xs,
  },
  currency: {
    ...Typography.caption,
    color: Colors.gray,
  },
});
