import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/components/AuthProvider';

export default function HomeScreen() {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Send Money',
      icon: 'send-outline',
      color: '#3b5998',
      onPress: () => {},
    },
    {
      title: 'Request Money',
      icon: 'download-outline',
      color: '#4CAF50',
      onPress: () => {},
    },
    {
      title: 'Pay Bills',
      icon: 'receipt-outline',
      color: '#FF9800',
      onPress: () => {},
    },
    {
      title: 'Top Up',
      icon: 'add-circle-outline',
      color: '#9C27B0',
      onPress: () => {},
    },
  ];

  const recentTransactions = [
    {
      id: '1',
      title: 'Salary',
      amount: 1000,
      date: 'Today',
      type: 'income',
    },
    {
      id: '2',
      title: 'Groceries',
      amount: -50,
      date: 'Yesterday',
      type: 'expense',
    },
    {
      id: '3',
      title: 'Rent',
      amount: -200,
      date: 'Mar 15',
      type: 'expense',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-blue-600 p-6">
        <Text className="text-white text-lg">Welcome back,</Text>
        <Text className="text-white text-2xl font-bold">
          {user?.email || 'Guest User'}
        </Text>
      </View>

      <View className="p-4">
        <View className="bg-white rounded-lg p-4 mb-4">
          <Text className="text-gray-500 mb-2">Total Balance</Text>
          <Text className="text-3xl font-bold">$1,234.56</Text>
        </View>

        <Text className="text-lg font-bold mb-4">Quick Actions</Text>
        <View className="flex-row flex-wrap justify-between">
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              onPress={action.onPress}
              className="w-[48%] bg-white rounded-lg p-4 mb-4 items-center"
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: `${action.color}20` }}
              >
                <Ionicons
                  name={action.icon as any}
                  size={24}
                  color={action.color}
                />
              </View>
              <Text className="text-center">{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-lg font-bold mb-4 mt-2">Recent Transactions</Text>
        {recentTransactions.map((transaction) => (
          <View
            key={transaction.id}
            className="flex-row items-center justify-between bg-white p-4 rounded-lg mb-2"
          >
            <View>
              <Text className="font-semibold">{transaction.title}</Text>
              <Text className="text-gray-500 text-sm">{transaction.date}</Text>
            </View>
            <Text
              className={`font-semibold ${
                transaction.type === 'income'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {transaction.type === 'income' ? '+' : ''}
              {transaction.amount.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
