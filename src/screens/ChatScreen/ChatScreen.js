import React, { useState, useEffect } from 'react';
import { ModalPicker } from 'emoji-mart-native';
import { GiftedChat, Actions } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import useStatsBar from '../../utils/useStatusBar';
import { renderInputToolbar, renderComposer, renderSend } from './InputToolbar';
import { renderMessageText } from './MessageContainer';
import { InputToolbar, Composer, Send } from 'react-native-gifted-chat';

const ChatScreen = ({ route, navigation }) => {

    useStatsBar('light-content');

    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const [emoji, setEmoji] = useState(false);

    function renderActions(props) {
        <Actions
            {...props}
            containerStyle={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 4,
                marginRight: 4,
                marginBottom: 0,
            }}
            icon={() => (
                <Image
                    style={{ width: 32, height: 32 }}
                    source={{
                        uri: 'https://placeimg.com/32/32/any',
                    }}
                />
            )}
            onSelect={() => setEmoji(true)}
            optionTintColor="#222B45"
        />
    }

    async function handleSend(messages) {
        const text = messages[0].text;

        firestore()
            .collection('threads')
            .doc(route.params.thread._id)
            .collection('messages')
            .add({
                text,
                createdAt: new Date().getTime(),
                user: route.params.user
            });

        await firestore()
            .collection('threads')
            .doc(route.params.thread._id)
            .set(
                {
                    latestMessage: {
                        text,
                        createdAt: new Date().getTime()
                    }
                },
                { merge: true }
            );
    }
    useEffect(() => {
        const messagesListener = firestore()
            .collection('threads')
            .doc(route.params.thread._id)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const messages = querySnapshot.docs.map(doc => {
                    const firebaseData = doc.data();

                    const data = {
                        _id: doc.id,
                        text: '',
                        createdAt: new Date().getTime(),
                        ...firebaseData
                    };

                    if (!firebaseData.system) {
                        data.user = {
                            ...firebaseData.user
                        };
                    }
                    return data;
                });

                setMessages(messages);
            });
        return () => messagesListener();
    }, []);

    return (
        <>
            <GiftedChat
                messages={messages}
                text={text}
                onInputTextChanged={setText}
                onSend={handleSend}
                user={route.params.user}
                renderUsernameOnMessage
                renderInputToolbar={renderInputToolbar}
                renderComposer={renderComposer}
                renderActions={renderActions}
                renderSend={renderSend}
            />
            <ModalPicker
                set='facebook'
                isVisible={emoji}
                showCloseButton
                onPressClose={() => {
                    setEmoji(false);
                }}
                onSelect={(emoji) => setText(text + emoji.colons)}
            />
        </>
    );
};

export default ChatScreen;
