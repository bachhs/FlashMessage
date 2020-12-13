import React from 'react';
import { Button } from 'react-native-paper';
import styles from './styles';

export default function FormUploadImg({ title, modeValue, ...rest }) {
    return (
        <Button
            mode={modeValue}
            {...rest}
            style={styles.buttonUploadimg}
            contentStyle={styles.buttonUpLoadContainer}
        >
            {title}
        </Button>
    );
}
