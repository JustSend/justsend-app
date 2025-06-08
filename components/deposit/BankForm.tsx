import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '@/styles/theme';

interface BankFormProps {
  bankAccount: string;
  bankRouting: string;
  showErrors: boolean;
  onBankAccountChange: (text: string) => void;
  onBankRoutingChange: (text: string) => void;
  getInputStyle: (hasError: boolean) => any[];
}

export const BankForm: React.FC<BankFormProps> = ({
  bankAccount,
  bankRouting,
  showErrors,
  onBankAccountChange,
  onBankRoutingChange,
  getInputStyle,
}) => {
  return (
    <>
      <Text style={styles.label}>Account Number</Text>
      <TextInput
        style={getInputStyle(
          showErrors && (!bankAccount || bankAccount.length < 8)
        )}
        placeholder="Account Number"
        placeholderTextColor={Colors.gray}
        keyboardType="numeric"
        value={bankAccount}
        onChangeText={onBankAccountChange}
      />
      <Text style={styles.label}>Routing Number</Text>
      <TextInput
        style={getInputStyle(
          showErrors && (!bankRouting || bankRouting.length !== 9)
        )}
        placeholder="Routing Number"
        placeholderTextColor={Colors.gray}
        keyboardType="numeric"
        value={bankRouting}
        onChangeText={onBankRoutingChange}
      />
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
});
