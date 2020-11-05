import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { renderMessageText } from './MessageContainer';
import useStatsBar from '../../utils/useStatusBar';

const ChatScreen = ({ route, navigation }) => {

    useStatsBar('light-content');

    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);

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
        <GiftedChat
            messages={messages}
            text={text}
            onInputTextChanged={setText}
            onSend={handleSend}
            //renderMessageText={renderMessageText}
            user={route.params.user}
            renderUsernameOnMessage
        />
    );
};

export default ChatScreen;
