import { View, StyleSheet } from 'react-native';
import TransactionList from '../components/TransactionList';

const mockTransactions = [
    { id: '1', title: 'Uber', amount: -8.75 },
    { id: '2', title: 'Payment from Lisa', amount: 40 },
    { id: '3', title: 'Groceries', amount: -23.40 },
];

export default function HistoryScreen() {
    return (
        <View style={styles.container}>
        <TransactionList transactions={mockTransactions} />
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
