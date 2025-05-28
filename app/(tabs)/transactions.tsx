import { View, Text, FlatList } from 'react-native';
import { mockTransactions } from '@/lib/mockdata';

export default function Transactions() {
  return (
    <View className="flex-1 bg-white">
      <View className="p-4 border-b border-gray-200">
        <Text className="text-2xl font-bold">Transactions</Text>
      </View>
      <FlatList
        data={mockTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="p-4 border-b border-gray-200">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="font-semibold">{item.title}</Text>
                <Text className="text-gray-500 text-sm">{item.date}</Text>
              </View>
              <Text
                className={`font-semibold ${item.amount > 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                {item.amount > 0 ? '+' : ''}
                {item.amount}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
