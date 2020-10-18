import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import initialMessages from '../../messages';
import { renderInputToolbar, renderActions, renderComposer, renderSend } from './InputToolbar';
import {
    renderAvatar,
    renderBubble,
    renderSystemMessage,
    renderMessage,
    renderMessageText,
} from './MessageContainer';

const ChatScreen = () => {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages(initialMessages.reverse());
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
                _id: 2,
                name: 'Aaron',
                avatar: 'https://placeimg.com/150/150/any',
            }}
            alignTop
            alwaysShowSend
            scrollToBottom
            renderAvatarOnTop
            renderUsernameOnMessage
            bottomOffset={26}
            onPressAvatar={console.log}
            renderInputToolbar={renderInputToolbar}
            renderActions={renderActions}
            renderComposer={renderComposer}
            renderSend={renderSend}
            renderAvatar={renderAvatar}
            renderBubble={renderBubble}
            renderSystemMessage={renderSystemMessage}
            renderMessage={renderMessage}
            renderMessageText={renderMessageText}
            // renderMessageImage
            isCustomViewBottom
            messagesContainerStyle={{ backgroundColor: 'indigo' }}
        />
    );
};

export default ChatScreen;
