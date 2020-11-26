import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, TouchableOpacity, ImageBackground, Text, Button } from 'react-native';
import { List, IconButton } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import useStatsBar from '../../utils/useStatusBar';
import styles from './styles';
import { AuthContext } from '../../navigation/AuthProvider';
import Loading from '../../components/Loading';

export default function ProfileScreen({ route, navigation }) {
    useStatsBar('light-content');
    const { user, logout } = useContext(AuthContext);
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);

    React.useLayoutEffect(() => {
        if (route.params == user.uid) {
            navigation.setOptions({
                headerRight: () => (
                    <IconButton
                        icon='account-edit'
                        size={22}
                        color='#ffffff'
                        onPress={() => navigation.navigate('EditProfile')}
                    />
                ),
            });
        }
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('users')
            .where('_id', '==', route.params)
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
                    navigation.setOptions({ title: userInfo.name });
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
        <>
            <List.Item
                title={userData.email}
                left={props => <List.Icon {...props} icon="folder" />}
            />
        </>
    );
}