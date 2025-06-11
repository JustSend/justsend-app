import React from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import { Colors, Spacing, Typography } from '@/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/components/AuthProvider';
import { depositStyles } from '@/styles/deposit';

export default function ReceiveScreen() {
  const { user } = useAuth();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Send me money on JustSend! My email is ${user?.email}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View style={depositStyles.container}>
      <TouchableOpacity
        style={depositStyles.backButton}
        onPress={() => {
          if (router.canGoBack?.()) {
            router.back();
          } else {
            router.replace('/');
          }
        }}
      >
        <Ionicons name="chevron-back" size={24} color={Colors.primary} />
      </TouchableOpacity>
      <View style={depositStyles.card}>
        <Text style={depositStyles.title}>Receive Money</Text>
        <Text
          style={[
            Typography.subtitle,
            {
              color: Colors.gray,
              marginBottom: Spacing.lg,
              textAlign: 'center',
            },
          ]}
        >
          Share your email to receive money
        </Text>

        <View
          style={{
            backgroundColor: Colors.lightGray,
            padding: Spacing.lg,
            borderRadius: 12,
            marginTop: Spacing.lg,
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              Typography.subtitle,
              { color: Colors.gray, marginBottom: Spacing.xs },
            ]}
          >
            Your Email
          </Text>
          <Text style={[Typography.title, { color: Colors.primary }]}>
            {user?.email}
          </Text>
        </View>

        <TouchableOpacity
          style={[depositStyles.button, { marginTop: Spacing.xl }]}
          onPress={handleShare}
        >
          <Text style={depositStyles.buttonText}>Share Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
