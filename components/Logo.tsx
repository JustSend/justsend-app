import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { Colors } from '@/styles/theme';

interface LogoProps {
  size?: number;
  showText?: boolean;
}

export function Logo({ size = 120, showText = true }: LogoProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/logo.png')}
        style={[styles.logo, { width: size, height: size }]}
        resizeMode="contain"
      />
      {showText && <Text style={styles.appName}>JustSend</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});
