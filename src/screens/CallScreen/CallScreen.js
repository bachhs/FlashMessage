import React, { useState, useEffect } from 'react';
import { Text, Button, View } from 'react-native';

import { RTCPeerConnection, RTCView, mediaDevices, RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc';
import firestore from '@react-native-firebase/firestore';

import styles from './styles';

const configuration = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
    ],
    iceCandidatePoolSize: 10,
};

export default function CallScreen({ route, navigation }) {

    const [calling, setCalling] = useState(true);

    function onBackPress() {
        if (cachedLocalPC) {
            cachedLocalPC.removeStream(localStream);
            cachedLocalPC.close();
        }
        setLocalStream();
        setRemoteStream();
        setCachedLocalPC();
        // cleanup
        navigation.goBack();
    }

    const [localStream, setLocalStream] = useState();
    const [remoteStream, setRemoteStream] = useState();
    const [cachedLocalPC, setCachedLocalPC] = useState();

    const [isMuted, setIsMuted] = useState(false);

    const startLocalStream = async () => {
        // isFront will determine if the initial camera should face user or environment
        const isFront = true;
        const devices = await mediaDevices.enumerateDevices();

        const facing = isFront ? 'front' : 'environment';
        const videoSourceId = devices.find(device => device.kind === 'videoinput' && device.facing === facing);
        const facingMode = isFront ? 'user' : 'environment';
        const constraints = {
            audio: true,
            video: {
                mandatory: {
                    minWidth: 640, // Provide your own width, height and frame rate here
                    minHeight: 480,
                    minFrameRate: 30,
                },
                facingMode,
                optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
            },
        };
        const newStream = await mediaDevices.getUserMedia(constraints);
        setLocalStream(newStream);
    };

    const startCall = async id => {
        const localPC = new RTCPeerConnection(configuration);
        localPC.addStream(localStream);

        const roomRef = await firestore().collection('rooms').doc(id);
        const callerCandidatesCollection = roomRef.collection('callerCandidates');
        localPC.onicecandidate = e => {
            if (!e.candidate) {
                console.log('Got final candidate!');
                return;
            }
            callerCandidatesCollection.add(e.candidate.toJSON());
        };

        localPC.onaddstream = e => {
            if (e.stream && remoteStream !== e.stream) {
                console.log('RemotePC received the stream call', e.stream);
                setRemoteStream(e.stream);
            }
        };

        const offer = await localPC.createOffer();
        await localPC.setLocalDescription(offer);

        const roomWithOffer = { offer };
        await roomRef.set(roomWithOffer);

        roomRef.onSnapshot(async snapshot => {
            const data = snapshot.data();
            if (!localPC.currentRemoteDescription && data.answer) {
                const rtcSessionDescription = new RTCSessionDescription(data.answer);
                await localPC.setRemoteDescription(rtcSessionDescription);
            }
        });

        roomRef.collection('calleeCandidates').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(async change => {
                if (change.type === 'added') {
                    let data = change.doc.data();
                    await localPC.addIceCandidate(new RTCIceCandidate(data));
                }
            });
        });

        setCachedLocalPC(localPC);
    };

    const joinCall = async id => {
        const roomRef = await firestore().collection('rooms').doc(id);
        const roomSnapshot = await roomRef.get();

        if (!roomSnapshot.exists) return
        const localPC = new RTCPeerConnection(configuration);
        localPC.addStream(localStream);

        const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
        localPC.onicecandidate = e => {
            if (!e.candidate) {
                console.log('Got final candidate!');
                return;
            }
            calleeCandidatesCollection.add(e.candidate.toJSON());
        };

        localPC.onaddstream = e => {
            if (e.stream && remoteStream !== e.stream) {
                console.log('RemotePC received the stream join', e.stream);
                setRemoteStream(e.stream);
            }
        };

        const offer = roomSnapshot.data().offer;
        await localPC.setRemoteDescription(new RTCSessionDescription(offer));

        const answer = await localPC.createAnswer();
        await localPC.setLocalDescription(answer);

        const roomWithAnswer = { answer };
        await roomRef.update(roomWithAnswer);

        roomRef.collection('callerCandidates').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(async change => {
                if (change.type === 'added') {
                    let data = change.doc.data();
                    await localPC.addIceCandidate(new RTCIceCandidate(data));
                }
            });
        });

        setCachedLocalPC(localPC);
    };

    const switchCamera = () => {
        localStream.getVideoTracks().forEach(track => track._switchCamera());
    };

    // Mutes the local's outgoing audio
    const toggleMute = () => {
        if (!remoteStream) {
            return;
        }
        localStream.getAudioTracks().forEach(track => {
            // console.log(track.enabled ? 'muting' : 'unmuting', ' local track', track);
            track.enabled = !track.enabled;
            setIsMuted(!track.enabled);
        });
    };


    return (
        <>
            <Text style={styles.heading}>Call Screen</Text>
            <Text style={styles.heading}>Room: {route.params.thread.name}</Text>

            <View style={styles.callButtons} >
                <View styles={styles.buttonContainer} >
                    <Button title="Click to stop call" onPress={onBackPress} />
                </View>
                <View styles={styles.buttonContainer} >
                    {!localStream && <Button title='Click to start stream' onPress={startLocalStream} />}
                    {localStream && !calling && <Button title='Click to start call' onPress={() => startCall(route.params.thread._id)} disabled={!!remoteStream} />}
                    {localStream && calling && <Button title='Click to join call' onPress={() => joinCall(route.params.thread._id)} disabled={!!remoteStream} />}

                </View>
            </View>

            {localStream && (
                <View style={styles.toggleButtons}>
                    <Button title='Switch camera' onPress={switchCamera} />
                    <Button title={`${isMuted ? 'Unmute' : 'Mute'} stream`} onPress={toggleMute} disabled={!remoteStream} />
                </View>
            )}

            <View style={{ display: 'flex', flex: 1, padding: 10 }} >
                <View style={styles.rtcview}>
                    {localStream && <RTCView style={styles.rtc} streamURL={localStream && localStream.toURL()} />}
                </View>
                <View style={styles.rtcview}>
                    {remoteStream && <RTCView style={styles.rtc} streamURL={remoteStream && remoteStream.toURL()} />}
                </View>
            </View>

        </>
    )
}

