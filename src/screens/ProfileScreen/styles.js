import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    header: {
        backgroundColor: "white",
    },
    headerContent: {
        padding: 10,
        alignItems: 'center',
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "black",
        marginBottom: 15,
    },
    name: {
        fontSize: 22,
        color: "#000000",
        fontWeight: 'bold'
    },
    userInfo: {
        fontSize: 16,
        color: "#778899",
        fontWeight: '600',
    },
    body: {
        backgroundColor: "white",
        height: 500,
        alignItems: 'flex-start',
        padding: 50,
    },
    item: {
        flexDirection: 'row',
        padding: 2,
    },
    infoContent: {
        flex: 1,
        alignItems: 'flex-start',
    },
    iconContent: {
        flex: 0.3,
        alignItems: 'flex-start',
        paddingRight: 5,
    },
    icon: {
        width: 30,
        height: 30,
        marginTop: 20,
    },
    info: {
        fontSize: 18,
        marginTop: 20,
        color: "black",
    },
    input: {
        flex: 1,
    },
    button: {

    }
});
