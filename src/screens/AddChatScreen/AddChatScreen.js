import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import Autocomplete from 'react-native-dropdown-autocomplete-textinput';
import useStatsBar from '../../utils/useStatusBar';
import styles from './styles';
import { height, width } from '../../components/styles';

export default function AddChatScreen({ navigation }) {
  useStatsBar('light-content');
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
          color='#0c8af9'
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Create a new chat room</Title>
        <View style={styles.input}>
          <Autocomplete
            data={DATA}
            displayKey="name"
            placeholder={'Placeholder1'}
            onSelect={value => console.log('value', value)}
          />
        </View>
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

const DATA = [
  { code: 'AN', name: 'Andaman and Nicobar Islands' },
  { code: 'AP', name: 'Andhra Pradesh' },
  { code: 'AR', name: 'Arunachal Pradesh' },
  { code: 'AS', name: 'Assam' },
  { code: 'BR', name: 'Bihar' },
  { code: 'CG', name: 'Chandigarh' },
  { code: 'CH', name: 'Chhattisgarh' },
  { code: 'DH', name: 'Dadra and Nagar Haveli' },
  { code: 'DD', name: 'Daman and Diu' },
  { code: 'DL', name: 'Delhi' },
  { code: 'GA', name: 'Goa' },
  { code: 'GJ', name: 'Gujarat' },
  { code: 'HR', name: 'Haryana' },
  { code: 'HP', name: 'Himachal Pradesh' },
  { code: 'JK', name: 'Jammu and Kashmir' },
  { code: 'JH', name: 'Jharkhand' },
  { code: 'KA', name: 'Karnataka' },
  { code: 'KL', name: 'Kerala' },
  { code: 'LD', name: 'Lakshadweep' },
  { code: 'MP', name: 'Madhya Pradesh' },
  { code: 'MH', name: 'Maharashtra' },
  { code: 'MN', name: 'Manipur' },
  { code: 'ML', name: 'Meghalaya' },
  { code: 'MZ', name: 'Mizoram' },
  { code: 'NL', name: 'Nagaland' },
  { code: 'OR', name: 'Odisha' },
  { code: 'PY', name: 'Puducherry' },
  { code: 'PB', name: 'Punjab' },
  { code: 'RJ', name: 'Rajasthan' },
  { code: 'SK', name: 'Sikkim' },
  { code: 'TN', name: 'Tamil Nadu' },
  { code: 'TS', name: 'Telangana' },
  { code: 'TR', name: 'Tripura' },
  { code: 'UK', name: 'Uttarakhand' },
  { code: 'UP', name: 'Uttar Pradesh' },
  { code: 'WB', name: 'West Bengal' },
];