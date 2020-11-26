import React, { useState, useEffect } from 'react';
import { ModalPicker } from 'emoji-mart-native';
import { GiftedChat, Actions } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import useStatsBar from '../../utils/useStatusBar';
import { renderBubble } from './MessageContainer';
import { renderInputToolbar, renderComposer, renderSend } from './InputToolbar';

const ChatScreen = ({ route, navigation }) => {

    useStatsBar('light-content');

    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const [emoji, setEmoji] = useState(false);

    const renderActions = (props) => (
        <Actions
            {...props}
            containerStyle={{
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 10,
                marginLeft: 4,
                marginRight: 1,
                marginBottom: 0,
            }}
            onPressActionButton={() => setEmoji(true)
            }
            optionTintColor="#222B45"
        />
    );

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
                renderBubble={renderBubble}
                user={route.params.user}
                renderUsernameOnMessage
                renderInputToolbar={renderInputToolbar}
                renderActions={renderActions}
                renderComposer={renderComposer}
                renderSend={renderSend}
                alwaysShowSend={true}
                onPressAvatar={(user) => {
                    navigation.navigate('Profile', user._id);
                }}
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
