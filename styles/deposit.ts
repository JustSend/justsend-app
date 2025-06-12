import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Spacing, Typography } from './theme';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export const depositStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isMobile ? Colors.white : Colors.background,
    padding: isMobile ? Spacing.md : Spacing.xl,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: isMobile ? Spacing.lg : Spacing.xl,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
    maxWidth: isMobile ? '100%' : 600,
    alignSelf: 'center',
    ...(isMobile
      ? {
          shadowOpacity: 0,
          elevation: 0,
          borderRadius: 0,
          padding: Spacing.md,
        }
      : {}),
  },
  backButton: {
    position: 'absolute',
    top: isMobile ? Spacing.md : Spacing.xl,
    left: isMobile ? Spacing.md : Spacing.xl,
    zIndex: 1,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: Spacing.xs,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    ...Typography.heading1,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  methodSelectorWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 16,
    marginBottom: Spacing.lg,
    padding: 4,
    width: '100%',
  },
  methodButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  methodButtonActive: {
    backgroundColor: Colors.white,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  methodButtonText: {
    ...Typography.subtitle,
    color: Colors.gray,
    marginLeft: 8,
  },
  methodButtonTextActive: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    ...Typography.body,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
    color: Colors.black,
  },
  inputError: {
    borderWidth: 1,
    borderColor: Colors.error,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xl,
    width: '100%',
  },
  buttonText: {
    ...Typography.button,
    color: Colors.white,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  amountCurrencyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    width: '100%',
  },
});
