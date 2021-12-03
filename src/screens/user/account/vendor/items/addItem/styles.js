import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#F9F9F9"
    },
    container: {
        flex: 1,
        paddingBottom: 40
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
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1A2D5A",
        marginTop: 40
    },
    pickerContainer: {
        width: "100%",
        height: 64,
        borderRadius: 4,
        justifyContent: "center",
        paddingLeft: 16,
        marginTop: 0,
        backgroundColor: "white"
    },
    inputField: {
        width: "100%",
        minHeight: 124,
        backgroundColor: "white",
        borderRadius: 5,
        color: "#1A2D5A",
        fontSize: 14,
        marginTop: 16,
        padding: 16,
        paddingTop: 20
    },
    imageContainer: {
        width: 72,
        height: 72,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 0
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
        resizeMode: "cover"
    },
    accountItem: {
        width: "100%",
        height: 71,
        borderBottomWidth: 1,
        borderColor: "rgba(0,0,0,0.05)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15
    },
    accountItemTitle: {
        fontSize: 16,
        color: "#1A2D5A",
        fontWeight: "bold"
    },
    checkBox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center"
    },
});

export default styles;