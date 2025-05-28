import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '@/components/AuthContext';

export default function Profile() {
  const { logout } = useAuth();

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-6">Profile</Text>

      <View className="bg-gray-50 p-4 rounded-lg mb-6">
        <Text className="text-lg font-semibold mb-2">Account Settings</Text>
        <TouchableOpacity className="py-3 border-b border-gray-200">
          <Text className="text-primary">Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity className="py-3 border-b border-gray-200">
          <Text className="text-primary">Security Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity className="py-3">
          <Text className="text-primary">Notifications</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={logout} className="bg-red-500 p-4 rounded-lg">
        <Text className="text-white text-center font-semibold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
