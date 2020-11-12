import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../components/Loading';
import useStatsBar from '../../utils/useStatusBar';
import styles from './styles';
import { AuthContext } from '../../navigation/AuthProvider';

export default function HomeScreen({ navigation }) {
    useStatsBar('light-content');
    const { user } = useContext(AuthContext);
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState();

    /**
     * Fetch threads from Firestore
     */
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
                        "avatar": documentSnapshot.data().avatar,
                        "email": documentSnapshot.data().email,
                        "location": documentSnapshot.data().location,
                        "phoneNumber": documentSnapshot.data().phoneNumber,
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
        <View style={styles.container}>
            <FlatList
                data={threads}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={() => <Divider />}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Chat', { thread: item, user: userInfo }, navigation)}
                    >
                        <List.Item
                            title={item.name}
                            description={item.latestMessage.text}
                            titleNumberOfLines={1}
                            titleStyle={styles.listTitle}
                            descriptionStyle={styles.listDescription}
                            descriptionNumberOfLines={1}
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}