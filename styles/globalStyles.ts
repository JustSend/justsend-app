import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors, Spacing, Typography, FontSizes, FontFamily } from './theme';

const isDesktop = Dimensions.get('window').width >= 768;

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    padding: Spacing.md,
  },
  card: {
    backgroundColor: isDesktop ? Colors.card : 'transparent',
    borderRadius: isDesktop ? 24 : 0,
    paddingVertical: isDesktop ? Spacing.xl : 0,
    paddingHorizontal: isDesktop ? Spacing.lg : 0,
    width: isDesktop ? '90%' : '100%',
    maxWidth: isDesktop ? 400 : undefined,
    alignSelf: isDesktop ? 'center' : 'stretch',
    shadowColor: isDesktop ? Colors.black : 'transparent',
    shadowOffset: isDesktop ? { width: 0, height: 2 } : undefined,
    shadowOpacity: isDesktop ? 0.1 : 0,
    shadowRadius: isDesktop ? 8 : 0,
    elevation: isDesktop ? 4 : 0,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...Typography.heading2,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  subtitle: {
    ...Typography.subtitle,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: Platform.OS === 'ios' ? 16 : 12,
    marginBottom: Spacing.md,
    backgroundColor: Colors.white,
    fontSize: 16,
    color: Colors.black,
  },
  buttonContainer: {
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: Platform.OS === 'ios' ? 16 : 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Platform.OS === 'ios' ? 16 : 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  buttonText: {
    fontSize: FontSizes.medium,
    fontWeight: '600',
    fontFamily: FontFamily,
    color: Colors.white,
  },
  secondaryButtonText: {
    fontSize: FontSizes.medium,
    fontWeight: '600',
    fontFamily: FontFamily,
    color: Colors.primary,
  },
  errorText: {
    ...Typography.caption,
    color: Colors.error,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: Spacing.xl,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    ...Typography.caption,
    marginHorizontal: Spacing.md,
  },
});
