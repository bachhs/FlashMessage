import React, { useState, useEffect, useContext } from 'react';
import { View, ImageBackground, Image } from 'react-native';
import FormInput from '../../components/FormInput';
import FormButtonLog from '../../components/FormButtonLog';
import firestore from '@react-native-firebase/firestore';
import useStatsBar from '../../utils/useStatusBar';
import { launchImageLibrary } from 'react-native-image-picker/src/index';
import storage, { firebase } from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import { AuthContext } from '../../navigation/AuthProvider';
import Loading from '../../components/Loading';
import bgimage from '../LoginScreen/bg.png'

export default function EditProfileScreen({ navigation, route }) {
    useStatsBar('light-content');
    const { user } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState();
    const [location, setLocation] = useState();
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('users')
            .where('_id', '==', user.uid)
            .onSnapshot(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    setName(documentSnapshot.data().name);
                    setImage({ uri: documentSnapshot.data().avatar })
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

    const selectImage = () => {
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                setImage(source);
            }
        });
    };

    async function handleButtonPress() {
        const { uri } = image;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        setLoading(true);
        await storage().ref('/images/' + filename).putFile(uploadUri).then(async (e) => {
            const url = await firebase.app().storage('gs://flashmessage-530bc.appspot.com/')
                .ref('/images/' + e.metadata.name).getDownloadURL();
            let docRef = firestore().collection('users').doc(user.uid);
            docRef.update({
                name: name,
                email: email,
                avatar: url,
                location: location,
                phoneNumber: phone,
            });
            const update = {
                displayName: name,
                photoURL: url,
            };
            auth().currentUser.updateProfile(update);
        });
        setLoading(false);
        setImage(null);
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <ImageBackground source={bgimage} style={styles.container}>
            <View style={styles.container}>
                {image !== null ? (
                    <Image source={{ uri: image.uri }} style={styles.imageBox} />
                ) : null}
                <FormButtonLog
                    title='Upload image'
                    modeValue='contained'
                    labelStyle={styles.loginButtonLabel}
                    onPress={selectImage}
                />
                <FormInput
                    labelName='Name'
                    value={name}
                    autoCapitalize='none'
                    onChangeText={userName => setName(userName)}
                />
                <FormInput
                    labelName='Email'
                    value={email}
                    autoCapitalize='none'
<<<<<<< HEAD
                    onChangeText={userEmail => setEmail(userEmail)}
=======
                    onChangeText={email => setEmail(email)}
>>>>>>> 4abb307833a1bf67797e8879da48b52f158c7afb
                />
                <FormInput
                    labelName='Location'
                    value={location}
                    autoCapitalize='none'
                    onChangeText={location => setLocation(location)}
                />
                <FormInput
                    labelName='Phone'
                    value={phone}
                    autoCapitalize='none'
                    onChangeText={phone => setPhone(phone)}
                />
                <FormButtonLog
                    title='Save'
                    modeValue='contained'
                    labelStyle={styles.loginButtonLabel}
                    onPress={() => handleButtonPress()}
                />
            </View>
        </ImageBackground>
    );
}