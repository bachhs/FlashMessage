import React from 'react';
import { Button } from 'react-native-paper';
import styles from './styles';

export default function FormButtonLog({ title, modeValue, ...rest }) {
    return (
        <Button
            mode={modeValue}
            {...rest}
            style={styles.buttonlog}
            contentStyle={styles.buttonlogContainer}
        >
            {title}
        </Button>
    );
}
