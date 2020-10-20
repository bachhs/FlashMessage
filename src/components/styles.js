import { StyleSheet, Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
    button: {
        marginTop: 10
    },
    buttonContainer: {
        width: width / 2,
        height: height / 15
    },
    input: {
        marginTop: 10,
        marginBottom: 10,
        width: width / 1.5,
        height: height / 15
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
