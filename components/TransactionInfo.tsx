import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Colors, Typography, Spacing } from '@/styles/theme';
import { Transaction } from '@/lib/interfaces';

interface TransactionInfoProps {
  transaction: Transaction;
}

export default function TransactionInfo({ transaction }: TransactionInfoProps) {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 375;

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

  const getTitle = () => {
    if (transaction.type === 'RECEIVE') {
      return `From: ${transaction.email}`;
    }
    if (transaction.type === 'SEND') {
      return `To: ${transaction.email}`;
    }
    return transaction.type;
  };

  return (
    <View style={[styles.container, isSmallScreen && styles.containerSmall]}>
      <View style={styles.leftContent}>
        <View style={styles.titleRow}>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text
            style={[styles.title, isSmallScreen && styles.titleSmall]}
            numberOfLines={1}
          >
            {getTitle()}
          </Text>
        </View>
        <Text style={[styles.date, isSmallScreen && styles.dateSmall]}>
          {new Date(transaction.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.rightContent}>
        <Text
          style={[
            styles.amount,
            { color },
            isSmallScreen && styles.amountSmall,
          ]}
          numberOfLines={1}
        >
          {sign}{' '}
          {transaction.amount.toLocaleString('en-US', {
            style: 'currency',
            currency: transaction.currency,
          })}
        </Text>
        <Text style={[styles.currency, isSmallScreen && styles.currencySmall]}>
          {transaction.currency}
        </Text>
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
  containerSmall: {
    padding: Spacing.sm,
  },
  leftContent: {
    flex: 1,
    marginRight: Spacing.sm,
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
    flex: 1,
  },
  titleSmall: {
    fontSize: 14,
  },
  rightContent: {
    alignItems: 'flex-end',
    minWidth: 100,
  },
  date: {
    ...Typography.caption,
    color: Colors.gray,
  },
  dateSmall: {
    fontSize: 12,
  },
  amount: {
    ...Typography.subtitle,
    marginBottom: Spacing.xs,
  },
  amountSmall: {
    fontSize: 14,
  },
  currency: {
    ...Typography.caption,
    color: Colors.gray,
  },
  currencySmall: {
    fontSize: 12,
  },
});
