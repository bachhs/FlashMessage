import { StyleSheet, Dimensions } from 'react-native';
export const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    closeButtonContainer: {
        position: 'absolute',
        top: 30,
        right: 0,
        zIndex: 1
    },
    input: {
        marginTop: 10,
        marginBottom: 10,
        width: width / 1.5,
        height: height / 15
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        marginBottom: 10
    },
    buttonLabel: {
        fontSize: 22
    }
});