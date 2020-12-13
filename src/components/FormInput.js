import React from 'react';
import { TextInput } from 'react-native-paper';
import styles from './styles';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1976d2',
    accent: '#f1c40f',
  },
};

export default function FormInput({ labelName, ...rest }) {
  return (
    <TextInput
      label={labelName}
      style={styles.input}
      numberOfLines={1}
      theme={theme}
      {...rest}
    />
  );
}
