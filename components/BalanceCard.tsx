import { View, Text, StyleSheet } from 'react-native';

export default function BalanceCard({ balance }: { balance: number }) {
    return (
        <View style={styles.card}>
            <Text style={styles.label}>Your Balance</Text>
            <Text style={styles.amount}>${balance.toFixed(2)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#007AFF',
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
    },
    label: { color: '#fff', fontSize: 16 },
    amount: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
});
