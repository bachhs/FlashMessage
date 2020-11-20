import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { List, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../components/Loading';
import useStatsBar from '../../utils/useStatusBar';
import styles from './styles';
import { AuthContext } from '../../navigation/AuthProvider';
import bgimage from '../LoginScreen/bg.png';

export default function HomeScreen({ navigation }) {
    useStatsBar('light-content');
    const { user } = useContext(AuthContext);
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState();

    async function getUserInfo() {
        let userInformation = await firestore()
            .collection('users')
            .where('_id', '==', user.uid)
            .get()
            .then(querySnapshot => {
                let userInfo;
                querySnapshot.forEach(documentSnapshot => {
                    userInfo = {
                        "_id": documentSnapshot.data()._id,
                        "name": documentSnapshot.data().name,
                        "avatar": documentSnapshot.data().avatar,
                        "email": documentSnapshot.data().email
                    };
                })
                return userInfo;
            });
        setUserInfo(userInformation);
    }

    useEffect(() => {
        getUserInfo();
        const unsubscribe = firestore()
            .collection('threads')
            .where('roomPeople', 'array-contains', user.uid)
            .orderBy('latestMessage.createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const threads = querySnapshot.docs.map(documentSnapshot => {
                    return {
                        _id: documentSnapshot.id,
                        name: '',

                        latestMessage: {
                            text: ''
                        },
                        ...documentSnapshot.data()
                    };
                });

                setThreads(threads);

                if (loading) {
                    setLoading(false);
                }
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
        <ImageBackground source={bgimage} blurRadius={2.5} style={styles.container}>
            <View>
                <FlatList
                    data={threads}
                    keyExtractor={item => item._id}
                    ItemSeparatorComponent={() => <Divider />}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Chat', { thread: item, user: userInfo }, navigation)}
                        >
                            <List.Item
                                style={styles.bgstlye}
                                title={item.name}
                                description={item.latestMessage.text}
                                titleNumberOfLines={1}
                                titleStyle={styles.listTitle}
                                descriptionStyle={styles.listDescription}
                                descriptionNumberOfLines={1}
                                left={props => <List.Icon {...props} style={styles.iconstyle} icon="account" />}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
        </ImageBackground>
    );
}