import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Bubble, MessageText } from 'react-native-gifted-chat';
import { Emoji } from 'emoji-mart-native';

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

const CustomMessageText = (props) => {
    const {
        currentMessage,
    } = props;
    const { text: currText } = currentMessage;
    const messages = currText.split(" ").map((element) => {
        const re = /:[^:\s]*(?:::[^:\s]*)*:/
        if (re.test(element))
            return (<Emoji emoji={element} set='facebook' size={20} />);
        return (
            <MessageText
                {...props}
                currentMessage={{
                    ...currentMessage,
                    text: element,
                }}
            />
        )
    }
    );

    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {messages}
        </View>
    );
}

export const renderMessageText = (props) => {
    const {
        currentMessage,
    } = props;
    const { text: currText } = currentMessage;
    return <CustomMessageText {...props} />
};

const styles = StyleSheet.create({
    checkboxView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        flex: 1,
    }
});