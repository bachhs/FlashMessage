import React from 'react';
import { Button } from 'react-native-paper';
import styles from './styles';

export default function FormButton({ title, modeValue, ...rest }) {
  return (
    <Button
      mode={modeValue}
      {...rest}
      style={styles.button}
      contentStyle={styles.buttonContainer}
    >
      {title}
    </Button>
  );
}
