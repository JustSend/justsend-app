import { Platform } from 'react-native';

export const Colors = {
  primary: '#2563eb',
  secondary: '#3b82f6',
  lightGray: '#F2F2F2',
  gray: '#6B7280',
  muted: '#9CA3AF',
  white: '#FFFFFF',
  black: '#000000',
  error: '#DC2626',
  income: '#34D399',
  expense: '#F87171',
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
    fontWeight: '700',
    color: Colors.black,
    fontFamily: FontFamily,
  },
  heading2: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: Colors.black,
    fontFamily: FontFamily,
  },
  subtitle: {
    fontSize: FontSizes.medium,
    fontWeight: '500',
    color: Colors.gray,
    fontFamily: FontFamily,
  },
  body: {
    fontSize: FontSizes.base,
    fontWeight: '400',
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
    fontWeight: '600',
    color: Colors.white,
    fontFamily: FontFamily,
  },
};
