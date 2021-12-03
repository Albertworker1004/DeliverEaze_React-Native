import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#F9F9F9"
    },
    container: {
        flex: 1
    },
    scrollViewContainer: {
        paddingHorizontal: 15
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 32
    },
    boldText: {
        color: "#1A2D5A",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 15
    },
    itemContainer: {
        width: "100%",
        borderRadius: 8,
        backgroundColor: "white",
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    rowContainer2: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    itemBoldText: {
        color: "#1A2D5A",
        fontWeight: "bold",
        fontSize: 16
    },
    greyText: {
        color: "#9b9b9b",
        fontSize: 14
    },
    itemRowContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    availableText: {
        fontWeight: "bold",
        fontSize: 16,
        marginRight: 12
    },
    image: {
        margin : 5,
        width: 90,
        height: 90,
        borderRadius: 8,
        resizeMode: "cover"
    }
});

export default styles;