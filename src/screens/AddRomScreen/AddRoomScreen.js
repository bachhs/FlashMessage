import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import useStatsBar from '../../utils/useStatusBar';
import styles from './styles';

export default function AddHomeScreen({ navigation }) {
  useStatsBar('dark-content');
  const [roomName, setRoomName] = useState('');

  function handleButtonPress() {
    if (roomName.length > 0) {
      firestore()
        .collection('threads')
        .add({
          name: roomName,
          latestMessage: {
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime()
          }
        })
        .then(docRef => {
          docRef.collection('messages').add({
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime(),
            system: true
          });
          navigation.navigate('Home');
        });
    }
  }
  return (
    <View style={styles.rootContainer}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon='close-circle'
          size={36}
          color='#6646ee'
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Create a new chat room</Title>
        <FormInput
          labelName='Room Name'
          value={roomName}
          onChangeText={text => setRoomName(text)}
          clearButtonMode='while-editing'
        />
        <FormButton
          title='Create'
          modeValue='contained'
          labelStyle={styles.buttonLabel}
          onPress={() => handleButtonPress()}
          disabled={roomName.length === 0}
        />
      </View>
    </View>
  );
}
