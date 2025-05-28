import { View, Text, FlatList } from 'react-native';
import { useAuth } from '@/components/AuthProvider';

type Transaction = {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: 'income' | 'expense';
};

const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 1000,
    description: 'Salary',
    date: '2024-03-20',
    type: 'income',
  },
  {
    id: '2',
    amount: -50,
    description: 'Groceries',
    date: '2024-03-19',
    type: 'expense',
  },
  {
    id: '3',
    amount: -200,
    description: 'Rent',
    date: '2024-03-15',
    type: 'expense',
  },
];

export default function TransactionsScreen() {
  const { user } = useAuth();

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View className="p-4 border-b border-gray-200">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-lg font-semibold">{item.description}</Text>
          <Text className="text-gray-500">{item.date}</Text>
        </View>
        <Text
          className={`text-lg font-bold ${
            item.type === 'income' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {item.type === 'income' ? '+' : ''}
          {item.amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 bg-blue-600">
        <Text className="text-2xl font-bold text-white">Transactions</Text>
      </View>
      <FlatList
        data={mockTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        className="flex-1"
      />
    </View>
  );
}
