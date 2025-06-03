import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '@/styles/theme';

interface HeaderProps {
  email: string | null | undefined;
  onSignOut: () => void;
}

export const Header = ({ email, onSignOut }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(email?.[0] || 'G').toUpperCase()}
            </Text>
          </View>
          <View>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.emailText}>{email || 'Guest User'}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onSignOut} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  avatarText: {
    ...Typography.heading2,
    color: Colors.primary,
  },
  welcomeText: {
    ...Typography.subtitle,
    color: Colors.white,
  },
  emailText: {
    ...Typography.heading2,
    color: Colors.white,
  },
  logoutButton: {
    padding: Spacing.sm,
  },
});
