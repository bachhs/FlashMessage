import { StyleSheet, Dimensions } from 'react-native';
export const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
    },
    rootContainer: {
        flex: 1
    },
    closeButtonContainer: {
        position: 'absolute',
        top: 15,
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
        marginTop: width / 3,
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        color: 'yellow'
    },
    buttonLabel: {
        fontSize: 25,
        fontWeight: '600',
        color: '#e8eff7'
    }
});