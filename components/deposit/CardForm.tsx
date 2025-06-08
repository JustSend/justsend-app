import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '@/styles/theme';

interface CardFormProps {
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  showErrors: boolean;
  onCardNumberChange: (text: string) => void;
  onExpiryChange: (text: string) => void;
  onCvvChange: (text: string) => void;
  getInputStyle: (hasError: boolean) => any[];
}

export const CardForm: React.FC<CardFormProps> = ({
  cardNumber,
  cardExpiry,
  cardCvv,
  showErrors,
  onCardNumberChange,
  onExpiryChange,
  onCvvChange,
  getInputStyle,
}) => {
  return (
    <>
      <Text style={styles.label}>Card Number</Text>
      <TextInput
        style={getInputStyle(
          showErrors &&
            (!cardNumber || cardNumber.replace(/\s/g, '').length < 16)
        )}
        placeholder="1234 5678 9012 3456"
        placeholderTextColor={Colors.gray}
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={onCardNumberChange}
        maxLength={19}
      />
      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: Spacing.md }}>
          <Text style={styles.label}>Expiry</Text>
          <TextInput
            style={getInputStyle(
              showErrors && (!cardExpiry || cardExpiry.length < 5)
            )}
            placeholder="MM/YY"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={cardExpiry}
            onChangeText={onExpiryChange}
            maxLength={5}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={getInputStyle(
              showErrors && (!cardCvv || cardCvv.length < 3)
            )}
            placeholder="123"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={cardCvv}
            onChangeText={onCvvChange}
            maxLength={3}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    ...Typography.subtitle,
    color: Colors.gray,
    marginBottom: Spacing.xs,
    marginTop: Spacing.lg,
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
});
