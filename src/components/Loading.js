import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import styles from './styles';

export default function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size='large' color='#6646ee' />
    </View>
  );
}
