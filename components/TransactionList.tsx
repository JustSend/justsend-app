import { FlatList, View } from 'react-native';
import TransactionItem from './TransactionItem';

type Transaction = {
    id: string;
    title: string;
    amount: number;
};

export default function TransactionList({ transactions }: { transactions: Transaction[] }) {
    return (
        <View>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TransactionItem title={item.title} amount={item.amount} />
                )}
            />
        </View>
    );
}
