import { StyleSheet } from 'react-native';
import { height, width } from '../../components/styles';

export default StyleSheet.create({
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
        marginLeft: width / 30,
        marginTop: height / 40
    },
    listItemStyle: {
        color: 'black',
        fontSize: 25
    },
    iconstyle: {
        backgroundColor: 'orange',
        borderRadius: 30,
        marginTop: 12,
        left: 0
    },
    logoIcon: {
        width: 170,
        height: 170,
        marginBottom: 20,
        borderRadius: 600
    },
    titleText: {
        fontSize: 30
    }
});
