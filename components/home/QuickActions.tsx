import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '@/styles/theme';
import DepositScreen from '@/app/(tabs)/deposit';
import WithdrawScreen from '@/app/(tabs)/withdraw';
import SendScreen from '@/app/(tabs)/send';
import ReceiveScreen from '@/app/(tabs)/receive';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

const quickActions = [
  {
    title: 'Deposit',
    icon: 'add-circle-outline',
    color: Colors.success,
    component: DepositScreen,
  },
  {
    title: 'Withdraw',
    icon: 'remove-circle-outline',
    color: Colors.error,
    component: WithdrawScreen,
  },
  {
    title: 'Send',
    icon: 'send-outline',
    color: Colors.primary,
    component: SendScreen,
  },
  {
    title: 'Receive',
    icon: 'download-outline',
    color: Colors.warning,
    component: ReceiveScreen,
  },
];

export const QuickActions = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);

  const handleClose = () => {
    setSelectedAction(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>
      <View style={styles.grid}>
        {quickActions.map((action, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedAction(index)}
            onHoverIn={() => setHoveredIndex(index)}
            onHoverOut={() => setHoveredIndex(null)}
            style={[
              styles.actionCard,
              {
                backgroundColor:
                  hoveredIndex === index ? `${action.color}15` : Colors.white,
              },
            ]}
          >
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: `${action.color}15` },
              ]}
            >
              <Ionicons
                name={action.icon as any}
                size={24}
                color={action.color}
              />
            </View>
            <Text style={styles.actionText}>{action.title}</Text>
          </Pressable>
        ))}
      </View>

      <Modal
        visible={selectedAction !== null}
        animationType={isMobile ? 'slide' : 'fade'}
        transparent={true}
        onRequestClose={handleClose}
      >
        <Pressable style={styles.modalOverlay} onPress={handleClose}>
          <Pressable
            style={styles.modalContainer}
            onPress={(e) => e.stopPropagation()}
          >
            {selectedAction !== null && (
              <View
                style={[
                  styles.modalContent,
                  isMobile && styles.mobileModalContent,
                ]}
              >
                <Pressable
                  style={[
                    styles.closeButton,
                    isMobile && styles.mobileCloseButton,
                  ]}
                  onPress={handleClose}
                >
                  <Ionicons name="close" size={24} color={Colors.gray} />
                </Pressable>
                {React.createElement(quickActions[selectedAction].component)}
              </View>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.heading2,
    marginBottom: Spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  actionText: {
    ...Typography.subtitle,
    color: Colors.black,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: isMobile ? '100%' : '90%',
    maxWidth: 500,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: Spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  mobileModalContent: {
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    borderRadius: 0,
    padding: Spacing.md,
  },
  closeButton: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    zIndex: 10,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 6,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  mobileCloseButton: {
    top: Spacing.xl,
    right: Spacing.xl,
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
});
