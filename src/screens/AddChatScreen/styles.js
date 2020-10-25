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
    },
    customTagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        backgroundColor: "#efeaea",
        width: 300
    },
    customTag: {
        backgroundColor: "gray",
        justifyContent: "center",
        alignItems: "center",
        height: 30,
        marginLeft: 5,
        marginTop: 5,
        borderRadius: 30,
        padding: 8
    }, autocompleteContainer: {
        flex: 1,
        left: 20,
        position: "absolute",
        right: 20,
        top: 100,
        zIndex: 1
    },
    label: {
        color: "#614b63",
        fontWeight: "bold",
        marginBottom: 10
    },
    messageContainer: {
        marginTop: 160,
        height: 200,
        alignSelf: "stretch",
        marginLeft: 20,
        marginRight: 20
    },
    message: {
        backgroundColor: "#efeaea",
        height: 200,
        textAlignVertical: "top"
    },
});