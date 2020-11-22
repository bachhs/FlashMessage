import * as React from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';
import { GiftedChat, MessageText, Bubble } from 'react-native-gifted-chat';

const CustomMessageText = (props) => {
    const {
        currentMessage,
    } = props;
    const { text: currText } = currentMessage;
    const [checked, setChecked] = React.useState(false);

    return (
        <View style={styles.checkboxView}>
            <Switch value={checked} onValueChange={(value) => setChecked(value)} style={{ flex: 1 }} />
            <MessageText {...props} style={{ flex: 1, }} textStyle={{
                left: {
                    color: '#000',
                },
                right: {
                    color: '#000',
                },
            }}
                currentMessage={{
                    ...currentMessage,
                    text: currText.replace('[x]', '').trim(),
                }} />
        </View>
    );
}

const App = (props) => {
    const renderBubble = (props) => {
        const {
            currentMessage: { text: currText },
        } = props;
        if (currText.indexOf('[x]') === -1) {
            return <Bubble {...props} />
        }

        return <Bubble {...props}
            wrapperStyle={{
                left: {
                    backgroundColor: '#fef0dd',
                },
                right: {
                    backgroundColor: '#fef0dd'
                }
            }}

            timeTextStyle={{
                left: {
                    color: '#000',
                },
                right: {
                    color: '#000',
                },
            }}
        />
    }

    const renderMessageText = (props) => {
        const {
            currentMessage,
        } = props;
        const { text: currText } = currentMessage;
        if (currText.indexOf('[x]') === -1) {
            return <MessageText {...props} />;
        }
        return <CustomMessageText {...props} />
    };

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                renderMessageText={renderMessageText}
                renderBubble={renderBubble}
                onSend={messages => { }}
                user={{
                    _id: 1,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 8,
        backgroundColor: '#fff',
        padding: 8,
    },
    checkboxView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        flex: 1,
    }
});

export default App;
