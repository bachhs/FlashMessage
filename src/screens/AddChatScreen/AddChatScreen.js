import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ImageBackground
} from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import FormButton from '../../components/FormButton';
import AutoTags from "react-native-tag-autocomplete";
import useStatsBar from '../../utils/useStatusBar';
import styles from './styles';
import { AuthContext } from '../../navigation/AuthProvider';
import bgimage from '../LoginScreen/chatscreen.jpg';

export default function AddChatScreen({ navigation }) {
  useStatsBar('light-content');

  const { user } = useContext(AuthContext);
  const [roomPeople, setRoomPeople] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  async function getSuggestion() {
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

  useEffect(() => { getSuggestion() }, []);

  async function handleButtonPress() {
    let roomName = "";
    for (let i in tagsSelected) {
      setRoomPeople(roomPeople.push(tagsSelected[i]._id));
      roomName += tagsSelected[i].name + " ";
    }
    setTagsSelected([]);
    setRoomPeople(roomPeople.push(user.uid));
    setRoomPeople(roomPeople.sort());

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

    if (!exist) {
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
          //navigation.navigate('Home');
        });
    }
    //navigation.navigate('Chat', { _id: user.uid, thread: item })
  }

  const customFilterData = (query) => {
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

  const customRenderTags = (tags) => {
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

  const customRenderSuggestion = (suggestion) => {
    //override suggestion render the drop down
    const name = suggestion.name;
    return (
      <Text>
        {name} - {suggestion.email}
      </Text>
    );
  };

  const handleDelete = (index) => {
    //tag deleted, remove from our tags array
    let temp = tagsSelected;
    temp.splice(index, 1);
    setTagsSelected([...temp]);
  };

  const handleAddition = (contact) => {
    //suggestion clicked, push it to our tags array
    setTagsSelected(tagsSelected.concat([contact]));
  };

  const onCustomTagCreated = (userInput) => {
    //user pressed enter, create a new tag from their input
    const contact = {
      email: userInput,
      name: null
    };
    handleAddition(contact);
  };

  return (
    <ImageBackground source={bgimage} blurRadius={2.5} style={styles.container}>
      <View style={styles.rootContainer}>
        <View style={styles.closeButtonContainer}>
          <IconButton
            icon='close-circle'
            size={40}
            color='white'
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
            onPress={() => handleButtonPress()}
            disabled={(tagsSelected.length === 0)}
          />
        </View>
      </View>
    </ImageBackground>
  );
}