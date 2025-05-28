import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '@/components/AuthProvider';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user } = useAuth();

  const menuItems = [
    {
      title: 'Personal Information',
      icon: 'person-outline',
      onPress: () => {},
    },
    {
      title: 'Security',
      icon: 'shield-outline',
      onPress: () => {},
    },
    {
      title: 'Notifications',
      icon: 'notifications-outline',
      onPress: () => {},
    },
    {
      title: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: () => {},
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-blue-600 p-6">
        <View className="items-center">
          <View className="w-24 h-24 rounded-full bg-white items-center justify-center mb-4">
            <Ionicons name="person" size={48} color="#3b5998" />
          </View>
          <Text className="text-xl font-bold text-white">
            {user?.email || 'Guest User'}
          </Text>
        </View>
      </View>

      <View className="p-4">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={item.onPress}
            className="flex-row items-center p-4 bg-white rounded-lg mb-2"
          >
            <Ionicons name={item.icon as any} size={24} color="#3b5998" />
            <Text className="ml-4 text-lg flex-1">{item.title}</Text>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        ))}

        <TouchableOpacity className="flex-row items-center p-4 bg-red-50 rounded-lg mt-4">
          <Ionicons name="log-out-outline" size={24} color="#dc2626" />
          <Text className="ml-4 text-lg text-red-600 flex-1">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
