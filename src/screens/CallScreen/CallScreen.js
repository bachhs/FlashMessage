import React, { useEffect, useState, useContext } from 'react';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../navigation/AuthProvider';

export default function CallScreen({ route, navigation }) {

    const { user } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(getUserInfo());
    async function getUserInfo() {
        let userInformation = await firestore()
            .collection('users')
            .where('_id', '==', user.uid)
            .get()
            .then(querySnapshot => {
                let userInfo;
                querySnapshot.forEach(documentSnapshot => {
                    userInfo = {
                        "_id": documentSnapshot.data()._id, "name": documentSnapshot.data().name,
                        "avatar": documentSnapshot.data().avatar
                    };
                })
                return userInfo;
            });
        return userInformation;
    }

    useEffect(() => {
        const url = 'https://meet.jit.si/' + route.params._id;
        const userInfomation = {
            displayName: userInfo.name,
            email: userInfo.email,
            avatar: userInfo.avatar,
        };
        JitsiMeet.call(url, userInfomation);
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
        //navigation.goBack();
    }

    function onConferenceJoined(nativeEvent) {
        /* Conference joined event */
        console.log("onConferenceJoined");
    }

    function onConferenceWillJoin(nativeEvent) {
        /* Conference will join event */
        console.log("onConferenceWillJoin");
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