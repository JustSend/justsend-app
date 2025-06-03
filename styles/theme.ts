import { Platform } from 'react-native';

export const Colors = {
  primary: '#009EE3',
  secondary: '#003087',
  accent: '#FFB800',
  lightGray: '#F7F9FC',
  gray: '#6B7280',
  muted: '#9CA3AF',
  white: '#FFFFFF',
  black: '#1A1F36',
  error: '#DC2626',
  success: '#059669',
  warning: '#D97706',
  background: '#F7F9FC',
  card: '#FFFFFF',
  border: '#E5E7EB',
};

export const FontSizes = {
  small: 12,
  base: 14,
  medium: 16,
  large: 20,
  xl: 24,
  xxl: 32,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const FontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const Typography = {
  heading1: {
    fontSize: FontSizes.xxl,
    fontWeight: '700' as const,
    color: Colors.black,
    fontFamily: FontFamily,
  },
  heading2: {
    fontSize: FontSizes.xl,
    fontWeight: '600' as const,
    color: Colors.black,
    fontFamily: FontFamily,
  },
  subtitle: {
    fontSize: FontSizes.medium,
    fontWeight: '500' as const,
    color: Colors.gray,
    fontFamily: FontFamily,
  },
  body: {
    fontSize: FontSizes.base,
    fontWeight: '400' as const,
    color: Colors.gray,
    fontFamily: FontFamily,
  },
  caption: {
    fontSize: FontSizes.small,
    color: Colors.muted,
    fontFamily: FontFamily,
  },
  button: {
    fontSize: FontSizes.medium,
    fontWeight: '600' as const,
    color: Colors.white,
    fontFamily: FontFamily,
  },
};
