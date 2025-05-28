import { View, Text } from 'react-native';
import QuickActions from '../../components/QuickActions';
import TransactionList from '../../components/TransactionList';
import BalanceCard from '../../components/BalanceCard';
import { mockTransactions } from '@/lib/mockdata';
import { useAuth } from '@/components/AuthProvider';

export default function Home() {
  const { user } = useAuth();

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Welcome, {user?.email}</Text>
      <View className="bg-primary/10 p-4 rounded-lg">
        <Text className="text-lg font-semibold mb-2">Quick Actions</Text>
        <Text className="text-gray-600">
          Your recent transactions and account summary will appear here.
        </Text>
      </View>
      <BalanceCard balance={237.5} />
      <QuickActions />
      <TransactionList transactions={mockTransactions} />
    </View>
  );
}
