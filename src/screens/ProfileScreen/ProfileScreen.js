import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { List, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import useStatsBar from '../../utils/useStatusBar';
import styles from './styles';
import { AuthContext } from '../../navigation/AuthProvider';
import Loading from '../../components/Loading';

export default function ProfileScreen() {
    useStatsBar('light-content');
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('users')
            .where('_id', '==', user.uid)
            .onSnapshot(querySnapshot => {
                let userInfo;
                querySnapshot.forEach(documentSnapshot => {
                    userInfo = {
                        "_id": documentSnapshot.data()._id,
                        "name": documentSnapshot.data().name,
                        "avatar": documentSnapshot.data().avatar,
                        "email": documentSnapshot.data().email
                    };
                    setUserData(userInfo);
                    console.log(userData);
                    if (loading) {
                        setLoading(false);
                    }

                })
            });

        /**
         * unsubscribe listener
         */
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <Text>{userData.email}</Text>
    );
}