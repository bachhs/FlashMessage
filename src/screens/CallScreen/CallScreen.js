import React, { useEffect } from 'react';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';

export default function CallScreen({ route, navigation }) {

    useEffect(() => {
        setTimeout(() => {
            const url = 'https://meet.jit.si/' + route.params._id;
            const userInfo = {
                displayName: 'User',
                email: 'user@example.com',
                avatar: 'https:/gravatar.com/avatar/abc123',
            };
            JitsiMeet.call(url, userInfo);
        }, 1000);
    }, [])

    useEffect(() => {
        return () => {
            JitsiMeet.endCall();
            navigation.goBack();
        };
    });

    function onConferenceTerminated(nativeEvent) {
        /* Conference terminated event */
        console.log("onConferenceTerminated");
        navigation.goBack();
    }

    function onConferenceJoined(nativeEvent) {
        /* Conference joined event */
        console.log("onConferenceJoined")
    }

    function onConferenceWillJoin(nativeEvent) {
        /* Conference will join event */
        console.log("onConferenceWillJoin")
    }
    return (
        <JitsiMeetView
            onConferenceTerminated={e => onConferenceTerminated(e)}
            onConferenceJoined={e => onConferenceJoined(e)}
            onConferenceWillJoin={e => onConferenceWillJoin(e)}
            style={{
                flex: 1,
                height: '100%',
                width: '100%',
            }}
        />
    )
}