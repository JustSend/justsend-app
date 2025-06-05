import { Transaction } from '@/lib/interfaces';
import { Text, View, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '@/styles/theme';

interface TransactionProps {
  transaction: Transaction;
}

export default function TransactionInfo({ transaction }: TransactionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleString();
  };

  const getTransactionTypeDisplay = (type: string) => {
    switch (type) {
      case 'DEPOSIT':
        return 'Deposit';
      case 'WITHDRAWAL':
        return 'Withdrawal';
      case 'TRANSFER':
        return 'Transfer';
      case 'PAYMENT':
        return 'Payment';
      default:
        return type;
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'DEPOSIT':
        return '↗️';
      case 'WITHDRAWAL':
        return '↙️';
      case 'TRANSFER':
        return '↔️';
      case 'PAYMENT':
        return '💳';
      default:
        return '💰';
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'DEPOSIT':
        return Colors.success;
      case 'WITHDRAWAL':
      case 'PAYMENT':
        return Colors.error;
      case 'TRANSFER':
        return Colors.warning || Colors.gray;
      default:
        return Colors.black;
    }
  };

  const getAmountPrefix = (type: string) => {
    switch (type) {
      case 'DEPOSIT':
        return '+';
      case 'WITHDRAWAL':
      case 'PAYMENT':
        return '-';
      case 'TRANSFER':
        return '';
      default:
        return '';
    }
  };

  return (
    <View style={styles.transactionCard}>
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <Text style={styles.transactionIcon}>
            {getTransactionIcon(transaction.type)}
          </Text>
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionTitle}>
            {getTransactionTypeDisplay(transaction.type)}
          </Text>
          <Text style={styles.transactionDate}>
            {formatDate(transaction.createdAt)}
          </Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text
          style={[
            styles.transactionAmount,
            { color: getAmountColor(transaction.type) },
          ]}
        >
          {getAmountPrefix(transaction.type)}
          {Math.abs(transaction.amount).toLocaleString('en-US', {
            style: 'currency',
            currency: transaction.currency,
          })}
        </Text>
        <Text style={styles.currencyCode}>{transaction.currency}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background || '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  transactionIcon: {
    fontSize: 20,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    ...Typography.subtitle,
    color: Colors.black,
    fontWeight: '600',
  },
  transactionDate: {
    ...Typography.caption,
    color: Colors.gray,
    marginTop: 2,
  },
  transactionId: {
    ...Typography.caption,
    color: Colors.gray,
    marginTop: 1,
    fontSize: 10,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    ...Typography.subtitle,
    fontWeight: '600',
  },
  currencyCode: {
    ...Typography.caption,
    color: Colors.gray,
    marginTop: 2,
    fontSize: 10,
  },
});
