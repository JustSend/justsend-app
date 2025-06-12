import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Clipboard,
  StyleSheet,
} from 'react-native';
import { Colors, Spacing, Typography } from '@/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { useUserDetails } from '@/hook/useUserDetails';
import { depositStyles } from '@/styles/deposit';
import Toast from 'react-native-toast-message';

export default function ReceiveScreen() {
  const { userDetails, loading, error } = useUserDetails();

  const handleCopy = async (text: string) => {
    try {
      await Clipboard.setString(text);
      Toast.show({
        type: 'success',
        text1: 'Copied to clipboard',
        position: 'top',
      });
    } catch (error) {
      console.error('Error copying:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to copy',
        position: 'top',
      });
    }
  };

  if (loading) {
    return (
      <View style={depositStyles.container}>
        <Text style={Typography.subtitle}>Loading...</Text>
      </View>
    );
  }

  if (error || !userDetails) {
    return (
      <View style={depositStyles.container}>
        <Text style={[Typography.subtitle, { color: Colors.error }]}>
          {error || 'Failed to load user details'}
        </Text>
      </View>
    );
  }

  return (
    <View style={depositStyles.container}>
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
          Share your details to receive money
        </Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={[Typography.subtitle, { color: Colors.gray }]}>
              Your Email
            </Text>
            <View style={styles.valueContainer}>
              <Text style={[Typography.heading2, { color: Colors.primary }]}>
                {userDetails.email}
              </Text>
              <TouchableOpacity
                onPress={() => handleCopy(userDetails.email)}
                style={styles.copyButton}
              >
                <Ionicons
                  name="copy-outline"
                  size={20}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoBox}>
            <Text style={[Typography.subtitle, { color: Colors.gray }]}>
              Your Alias
            </Text>
            <View style={styles.valueContainer}>
              <Text style={[Typography.heading2, { color: Colors.primary }]}>
                {userDetails.alias}
              </Text>
              <TouchableOpacity
                onPress={() => handleCopy(userDetails.alias)}
                style={styles.copyButton}
              >
                <Ionicons
                  name="copy-outline"
                  size={20}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    gap: Spacing.lg,
  },
  infoBox: {
    backgroundColor: Colors.lightGray,
    padding: Spacing.lg,
    borderRadius: 12,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  copyButton: {
    padding: Spacing.xs,
  },
});
