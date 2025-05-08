import { View, Text, StyleSheet } from 'react-native';

type TransactionItemProps = {
    title: string;
    amount: number;
    date?: string;
    type?: 'sent' | 'received'; // optional: to style differently
};

export default function TransactionItem({ title, amount, date, type = 'received' }: TransactionItemProps) {
    const isSent = type === 'sent';

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{title}</Text>
                {date && <Text style={styles.date}>{date}</Text>}
            </View>
            <Text style={[styles.amount, isSent ? styles.sent : styles.received]}>
                {isSent ? '-' : '+'}${Math.abs(amount).toFixed(2)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
    },
    date: {
        fontSize: 12,
        color: '#999',
    },
    amount: {
        fontSize: 16,
        fontWeight: '600',
    },
    sent: {
        color: '#FF3B30',
    },
    received: {
        color: '#4CD964',
    },
});
