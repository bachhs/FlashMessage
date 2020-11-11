import { StyleSheet } from 'react-native';
import { height } from '../../components/styles';

export default StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewstyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 32,
        marginTop: 50,
        marginBottom: 20,
        color: 'white',
    },
    loginButtonLabel: {
        marginLeft: 90,
        fontSize: 22
    },
    navButtonText: {
        fontSize: 18
    },
    navButton: {
        marginTop: 20
    }
});