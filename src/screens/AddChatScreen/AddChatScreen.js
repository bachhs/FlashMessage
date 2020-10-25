import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  TouchableHighlight
} from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import firestore, { firebase } from '@react-native-firebase/firestore';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import AutoTags from "react-native-tag-autocomplete";
import useStatsBar from '../../utils/useStatusBar';
import styles from './styles';
import { height, width } from '../../components/styles';
import { FlatList } from 'react-native-gesture-handler';

export default function AddChatScreen({ navigation }) {
  useStatsBar('light-content');
  const [roomName, setRoomName] = useState('');
  const [roomPeople, setRoomPeople] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  async function myAsyncEffect() {
    let contactList = await firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        let listContact = [];
        querySnapshot.forEach(documentSnapshot => {
          listContact.push({
            "name": documentSnapshot.data().name, "email": documentSnapshot.data().email,
            "_id": documentSnapshot.data()._id
          });
        });
        return listContact;
      });
    setSuggestions(contactList);
  }

  useEffect(() => { myAsyncEffect() }, []);

  async function handleButtonPress() {

    for (let i in tagsSelected) {
      setRoomPeople(roomPeople.push(tagsSelected[i]._id));
    }

    let exist = await firestore()
      .collection('threads')
      .get()
      .then((querySnapShot) => {
        let temp = false;
        querySnapShot.forEach((doc) => {
          if (JSON.stringify(doc.data().roomPeople) == JSON.stringify(roomPeople)) {
            temp = true;
          }
        });
        return temp;
      }
      );

    if (roomName.length > 0 && !exist) {
      firestore()
        .collection('threads')
        .add({
          name: roomName,
          roomPeople: roomPeople,
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

  const customFilterData = query => {
    //override suggestion filter, we can search by specific attributes
    query = query.toUpperCase();
    let searchResults = suggestions.filter(s => {
      return (
        s.name.toUpperCase().includes(query) ||
        s.email.toUpperCase().includes(query)
      );
    });
    return searchResults;
  };

  const customRenderTags = tags => {
    //override the tags render
    return (
      <View style={styles.customTagsContainer}>
        {tagsSelected.map((t, i) => {
          return (
            <TouchableHighlight
              key={i}
              style={styles.customTag}
              onPress={() => handleDelete(i)}
            >
              <Text style={{ color: "white" }}>
                {t.name || t.email}
              </Text>
            </TouchableHighlight>
          );
        })}
      </View>
    );
  };

  const customRenderSuggestion = suggestion => {
    //override suggestion render the drop down
    const name = suggestion.name;
    return (
      <Text>
        {name} - {suggestion.email}
      </Text>
    );
  };

  const handleDelete = index => {
    //tag deleted, remove from our tags array
    let temp = tagsSelected;
    temp.splice(index, 1);
    setTagsSelected([...temp]);
  };

  const handleAddition = contact => {
    //suggestion clicked, push it to our tags array
    setTagsSelected(tagsSelected.concat([contact]));
  };

  const onCustomTagCreated = userInput => {
    //user pressed enter, create a new tag from their input
    const contact = {
      email: userInput,
      name: null
    };
    handleAddition(contact);
  };

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
        <AutoTags
          suggestions={suggestions}
          tagsSelected={tagsSelected}
          handleAddition={handleAddition}
          handleDelete={handleDelete}
          placeholder="Add a contact.."
          filterData={customFilterData}
          renderSuggestion={customRenderSuggestion}
          renderTags={customRenderTags}
          onCustomTagCreated={onCustomTagCreated}
          createTagOnSpace
        />
        <FormButton
          title='Create'
          modeValue='contained'
          labelStyle={styles.buttonLabel}
          onPress={() => handleButtonPress([roomName])}
          disabled={(tagsSelected.length === 0)}
        />
      </View>
    </View>
  );
}