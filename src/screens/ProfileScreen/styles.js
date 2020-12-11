import { StyleSheet } from 'react-native';
import { height, width } from '../../components/styles';

export default StyleSheet.create({
    imageBox: {
        width: 200,
        height: 200
    },
    box: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: height / 20,
        backgroundColor: 'whitesmoke'
    },
    container: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        flex: 1,
        width: null,
        height: null,
        alignSelf: 'stretch',
        marginLeft: width / 18,
        marginTop: height / 40
    },
    listItemStyle: {
        color: 'black',
        fontSize: 27
    },
    iconstyle: {
        backgroundColor: 'orange',
        borderRadius: 40,
        marginTop: 12,
        left: 0
    },
    logoIcon: {
        width: 150,
        height: 150,
        marginBottom: 20
    },
    titleText: {
        fontSize: 30
    }
});
