import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import { AuthContext } from '../../navigation/AuthProvider';
import styles from './styles';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Title style={styles.titleText}>Welcome to Chat app</Title>
            <FormInput
                labelName='Email'
                value={email}
                autoCapitalize='none'
                onChangeText={userEmail => setEmail(userEmail)}
            />
            <FormInput
                labelName='Password'
                value={password}
                secureTextEntry={true}
                onChangeText={userPassword => setPassword(userPassword)}
            />
            <FormButton
                title='Login'
                modeValue='contained'
                labelStyle={styles.loginButtonLabel}
                onPress={() => login(email, password)}
            />
            <FormButton
                title='New user? Join here'
                modeValue='text'
                uppercase={false}
                labelStyle={styles.navButtonText}
                onPress={() => navigation.navigate('Registration')}
            />
        </View>
    );
}