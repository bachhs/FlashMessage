import React, { useState, useEffect, useContext } from 'react';
import { View, Image } from 'react-native';
import { List, IconButton, Title } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import useStatsBar from '../../utils/useStatusBar';
import styles from './styles';
import { AuthContext } from '../../navigation/AuthProvider';
import Loading from '../../components/Loading';
import FormButton from '../../components/FormButton';

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
                        size={30}
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
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={styles.box}>
                <Image
                    style={styles.logoIcon}
                    source={{
                        uri: userData.avatar,
                    }}
                />
                <Title style={styles.titleText}>{userData.name}</Title>
            </View>
            <View style={styles.listContainer}>
                <List.Item
                    title={userData.email}
                    titleStyle={styles.listItemStyle}
                    left={props => <List.Icon {...props} color="yellow" style={styles.iconstyle} icon="email" />}
                />
                <List.Item
                    title={userData.email}
                    titleStyle={styles.listItemStyle}
                    left={props => <List.Icon {...props} color="yellow" style={styles.iconstyle} icon="google-maps" />}
                />
                <List.Item
                    title={userData.email}
                    titleStyle={styles.listItemStyle}
                    left={props => <List.Icon {...props} color="yellow" style={styles.iconstyle} icon="cellphone" />}
                />
            </View >
            <View style={styles.container}>
                <FormButton
                    title='Log Out'
                    modeValue='text'
                    uppercase={false}
                    labelStyle={styles.navButtonText}
                    onPress={() => logout()}
                />
            </View >
        </View >

    );
}