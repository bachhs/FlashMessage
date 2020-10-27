import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';

export default function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size='large' color='#0c8af9' />
    </View>
  );
}
