import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import firestore from '@react-native-firebase/firestore';

export default function HomeScreen(props) {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firestore().collection('entities');
    const userID = props.extraData.id;

    useEffect(() => {
        firestore().collection('entities').where("authorID", "==", userID).orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
            const newEntities = []
            querySnapshot.forEach(doc => {
                const entity = doc.data()
                entity.id = doc.id
                newEntities.push(entity)
            });
            setEntities(newEntities);
        },
            error => {
                console.log(error)
            }
        )
    }, [])

    const onAddButtonPress = () => {
        if (entityText && entityText.length > 0) {
            const timestamp = firestore.FieldValue.serverTimestamp();
            const data = {
                text: entityText,
                authorID: userID,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    const renderEntity = ({ item, index }) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {index}. {item.text}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add new entity'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEntityText(text)}
                    value={entityText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            { entities && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderEntity}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
        </View>
    )
}