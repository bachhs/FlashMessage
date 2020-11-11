import React, { useState, useContext } from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { Title } from 'react-native-paper';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import FormButtonLog from '../../components/FormButtonLog';
import FormTransparent from '../../components/FormTransparent';
import { AuthContext } from '../../navigation/AuthProvider';
import styles from './styles';

import bgimage from '../LoginScreen/bg.png'


export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(AuthContext);

    return (
        <ImageBackground source={bgimage} style={styles.container}>
            <View style={styles.viewstyle}>
                <Image
                    style={styles.logoIcon}
                    source={require('../LoginScreen/ic_launcher_round.png')}
                />
                <Title style={styles.titleText}>Welcome to FlashMessage</Title>
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
                <FormButtonLog
                    title='Log in'
                    modeValue='contained'
                    uppercase={false}
                    labelStyle={styles.loginButtonLabel}
                    onPress={() => login(email, password)}
                />
                <FormTransparent
                    title='Forgot Password?'
                    modeValue='text'
                    uppercase={false}
                    labelStyle={{ color: 'white', fontSize: 17 }}
                    onPress={() => login(email, password)}
                />
                <FormButton
                    title='Create New FlashMessage Account'
                    modeValue='text'
                    uppercase={false}
                    labelStyle={styles.navButtonText}
                    onPress={() => navigation.navigate('Registration')}
                />
            </View >
        </ImageBackground>

    );
}