import React from 'react';
import { Image } from 'react-native';
import { InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat';
import { width } from '../../components/styles';

export const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: 'whitesmoke',
      paddingTop: 2,
      borderTopColor: 'whitesmoke'
    }}
    primaryStyle={{ alignItems: 'center' }}
  />
);

export const renderComposer = (props) => (
  <Composer
    {...props}
    textInputStyle={{
      color: '#222B45',
      backgroundColor: '#ece9e9',
      borderWidth: 0.8,
      borderBottomEndRadius: 10,
      borderRadius: 30,
      borderColor: 'yellow',
      paddingTop: 15,
      paddingHorizontal: 12,
      marginRight: width / 6
    }}
  />
);

export const renderSend = (props) => (
  <Send
    {...props}
    disabled={!props.text}
    containerStyle={{
      position: 'absolute',
      right: 0,
      width: 60,
      height: 44,
      marginTop: 10,
      justifyContent: 'flex-end',
      marginHorizontal: 2,
    }}

  >
  </Send>
);
