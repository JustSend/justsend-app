import { View, StyleSheet } from 'react-native';
import QuickActions from '../components/QuickActions';
import TransactionList from '../components/TransactionList';
import BalanceCard from "../components/BalanceCard";

const mockTransactions = [
    { id: '1', title: 'Starbucks', amount: -4.5 },
    { id: '2', title: 'Payment from Ana', amount: 100 },
];

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <BalanceCard balance={237.50} />
            <QuickActions />
            <TransactionList transactions={mockTransactions} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
