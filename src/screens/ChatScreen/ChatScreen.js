import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import initialMessages from '../../messages';
import useStatsBar from '../../utils/useStatusBar';

const ChatScreen = () => {

    useStatsBar('light-content');

    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages(initialMessages);
    }, []);

    const onSend = (newMessages = []) => {
        setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    };

    return (
        <GiftedChat
            messages={messages}
            text={text}
            onInputTextChanged={setText}
            onSend={onSend}
            user={{
                _id: 1,
                name: 'Aaron',
                avatar: 'https://placeimg.com/150/150/any',
            }}
        />
    );
};

export default ChatScreen;
