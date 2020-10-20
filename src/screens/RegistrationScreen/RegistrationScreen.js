import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, IconButton } from 'react-native-paper';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import { AuthContext } from '../../navigation/AuthProvider';
import styles from './styles';

export default function RegistrationScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const { register } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Register to chat</Title>
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

      <FormButton
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
  );
}


