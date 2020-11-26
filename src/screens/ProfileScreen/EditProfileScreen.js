import React, { useState, useEffect, useContext } from 'react';
import FormInput from '../../components/FormInput';
import FormButtonLog from '../../components/FormButtonLog';
import firestore from '@react-native-firebase/firestore';
import useStatsBar from '../../utils/useStatusBar';
import styles from './styles';
import { AuthContext } from '../../navigation/AuthProvider';
import Loading from '../../components/Loading';

export default function EditProfileScreen({ navigation, route }) {
    useStatsBar('light-content');
    const { user } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('users')
            .where('_id', '==', user.uid)
            .onSnapshot(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    setName(documentSnapshot.data().name);
                    setAvatar(documentSnapshot.data().avatar);
                    setEmail(documentSnapshot.data().email);
                });
                if (loading) {
                    setLoading(false);
                }
            });

        /**
         * unsubscribe listener
         */
        return () => unsubscribe();
    }, []);


    function handleButtonPress() {
        let docRef = firestore().collection('users').doc(user.uid);
        docRef.update({
            name: name,
            email: email,
            location: location,
            phoneNumber: phoneNumber,
        });
        const update = {
            displayName: name,
            photoURL: 'https://i.pinimg.com/originals/b9/58/2d/b9582d806f57b4d8aab0655759d3cb34.jpg',
        };
        auth().currentUser.updateProfile(update);
        navigation.goBack();
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <FormInput
                labelName='Email'
                value={email}
                autoCapitalize='none'
                onChangeText={userEmail => setEmail(userEmail)}
            />
            <FormInput
                labelName='Name'
                value={name}
                autoCapitalize='none'
                onChangeText={userName => setName(userName)}
            />

            <FormButtonLog
                title='Save'
                modeValue='contained'
                labelStyle={styles.loginButtonLabel}
                onPress={() => handleButtonPress()}
            />
        </>
    );
}