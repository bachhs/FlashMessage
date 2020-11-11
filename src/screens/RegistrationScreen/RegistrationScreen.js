import React, { useState, useContext } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Title, IconButton } from 'react-native-paper';
import FormInput from '../../components/FormInput';
import FormButtonLog from '../../components/FormButtonLog';
import { AuthContext } from '../../navigation/AuthProvider';
import styles from './styles';
import bgimage from '../LoginScreen/bg.png'

export default function RegistrationScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const { register } = useContext(AuthContext);

  return (
    <ImageBackground source={bgimage} style={styles.container}>
      <View style={styles.viewstyles}>
        <Title style={styles.titleText}>Create Account</Title>
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
        <FormInput
          labelName='Confirm Password'
          value={confirmPassword}
          secureTextEntry={true}
          onChangeText={userConfirmPassword => setConfirmPassword(userConfirmPassword)}
        />
        <FormInput
          labelName='Name'
          value={name}
          autoCapitalize='none'
          onChangeText={userName => setName(userName)}
        />

        <FormButtonLog
          title='Register'
          modeValue='contained'
          labelStyle={styles.loginButtonLabel}
          onPress={() => register(email, password, confirmPassword, name)}
        />
        <IconButton
          icon='keyboard-backspace'
          size={30}
          style={styles.navButton}
          color='#0c8af9'
          onPress={() => navigation.goBack()}
        />
      </View>
    </ImageBackground>
  );
}


