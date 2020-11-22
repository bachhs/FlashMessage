import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Bubble, SystemMessage, Message, MessageText } from 'react-native-gifted-chat';

export const renderAvatar = (props) => (
    <Avatar
        {...props}
        containerStyle={{ left: { borderWidth: 3, borderColor: 'red' }, right: {} }}
        imageStyle={{ left: { borderWidth: 3, borderColor: 'blue' }, right: {} }}
    />
);

export const renderBubble = (props) => (
    <Bubble
        {...props}
        wrapperStyle={{
            left: { backgroundColor: '#dadada' },
            right: {},
        }}
        tickStyle={{}}
        usernameStyle={{ fontWeight: '100' }}
    />
);