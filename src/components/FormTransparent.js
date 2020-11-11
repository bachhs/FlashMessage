import React from 'react';
import { Button } from 'react-native-paper';
import styles from './styles';

export default function FormTransparent({ title, modeValue, ...rest }) {
    return (
        <Button
            mode={modeValue}
            {...rest}
            style={styles.buttonTransparent}
            contentStyle={styles.buttonTransparentContainer}
        >
            {title}
        </Button>
    );
}
