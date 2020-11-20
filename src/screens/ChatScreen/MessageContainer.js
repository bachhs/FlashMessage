import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Bubble, SystemMessage, Message, MessageText } from 'react-native-gifted-chat';

export const renderMessageText = (props) => {
    const {
        currentMessage,
    } = props;
    const { text: currText } = currentMessage;
    if (currText.indexOf('[x]') === -1) {
        return <MessageText {...props} />;
    }
    return (
        <View style={styles.checkboxView}>
            <MessageText {...props} />
        </View>
    );
};