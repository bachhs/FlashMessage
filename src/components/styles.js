import { StyleSheet, Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
    buttonlog: {
        marginTop: 10,
        backgroundColor: '#0c8af9',
        borderRadius: 8
    },

    button: {
        marginTop: 120,
        backgroundColor: '#55ad3b'
    },

    buttonTransparent: {
        marginTop: 8,
        backgroundColor: 'transparent'
    },

    buttonContainer: {
        width: width / 1.3,
        height: height / 20
    },

    buttonlogContainer: {
        width: width / 1.8,
        height: height / 17.5,
    },

    buttonTransparentContainer: {
        width: width / 1.8,
        height: height / 17.5
    },

    input: {
        marginTop: 10,
        marginBottom: 10,
        width: width / 1.3,
        height: height / 15,
        backgroundColor: '#ffffff',
        opacity: 0.97,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10
    },

    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
