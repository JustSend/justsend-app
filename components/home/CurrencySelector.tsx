import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '@/styles/theme';
import { Currency } from '@/lib/currency';

interface CurrencySelectorProps {
  currencies: Currency[];
  selectedCurrency: string;
  onSelect: (currency: string) => void;
}

const isDesktop = Dimensions.get('window').width >= 768;

export const CurrencySelector = ({
  currencies,
  selectedCurrency,
  onSelect,
}: CurrencySelectorProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const selectedCurrencyData = currencies.find(
    (c) => c.code === selectedCurrency
  );

  useEffect(() => {
    if (isModalVisible) {
      if (isDesktop) {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }).start();
      } else {
        slideAnim.setValue(300);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      }
    }
  }, [isModalVisible, fadeAnim, slideAnim]);

  const handleClose = () => {
    if (isDesktop) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setIsModalVisible(false));
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setIsModalVisible(false));
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.selectorText}>
          {selectedCurrencyData?.code || selectedCurrency}
        </Text>
        <Ionicons name="chevron-down" size={16} color={Colors.primary} />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="none"
        onRequestClose={handleClose}
      >
        <View
          style={[
            styles.modalOverlay,
            isDesktop ? styles.modalOverlayDesktop : styles.modalOverlayMobile,
          ]}
        >
          {isDesktop ? (
            <Animated.View
              style={[
                styles.modalContent,
                styles.modalContentDesktop,
                { opacity: fadeAnim },
              ]}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Currency</Text>
                <TouchableOpacity
                  onPress={handleClose}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color={Colors.gray} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={currencies}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.currencyItem,
                      item.code === selectedCurrency && styles.selectedItem,
                    ]}
                    onPress={() => {
                      onSelect(item.code);
                      handleClose();
                    }}
                  >
                    <View style={styles.currencyInfo}>
                      <Text style={styles.currencyCode}>{item.code}</Text>
                      <Text style={styles.currencyName}>{item.name}</Text>
                    </View>
                    {item.code === selectedCurrency && (
                      <Ionicons
                        name="checkmark"
                        size={24}
                        color={Colors.primary}
                      />
                    )}
                  </TouchableOpacity>
                )}
              />
            </Animated.View>
          ) : (
            <Animated.View
              style={[
                styles.modalContent,
                styles.modalContentMobile,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Currency</Text>
                <TouchableOpacity
                  onPress={handleClose}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color={Colors.gray} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={currencies}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.currencyItem,
                      item.code === selectedCurrency && styles.selectedItem,
                    ]}
                    onPress={() => {
                      onSelect(item.code);
                      handleClose();
                    }}
                  >
                    <View style={styles.currencyInfo}>
                      <Text style={styles.currencyCode}>{item.code}</Text>
                      <Text style={styles.currencyName}>{item.name}</Text>
                    </View>
                    {item.code === selectedCurrency && (
                      <Ionicons
                        name="checkmark"
                        size={24}
                        color={Colors.primary}
                      />
                    )}
                  </TouchableOpacity>
                )}
              />
            </Animated.View>
          )}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 20,
  },
  selectorText: {
    ...Typography.subtitle,
    color: Colors.primary,
    marginRight: Spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalOverlayDesktop: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlayMobile: {
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    maxHeight: '80%',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  modalContentDesktop: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 24,
  },
  modalContentMobile: {
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    ...Typography.heading2,
    color: Colors.black,
  },
  closeButton: {
    padding: Spacing.xs,
  },
  currencyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  selectedItem: {
    backgroundColor: Colors.lightGray,
  },
  currencyInfo: {
    flex: 1,
  },
  currencyCode: {
    ...Typography.subtitle,
    color: Colors.black,
    marginBottom: 2,
  },
  currencyName: {
    ...Typography.caption,
    color: Colors.gray,
  },
});
