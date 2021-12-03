import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#F9F9F9"
    },
    container: {
        flex: 1
    },
    boldText: {
        color: "#1A2D5A",
        fontSize: 16,
        fontWeight: "bold"
    },
    rowContainer: {
        flexDirection: "row",
        marginTop: 8,
        paddingHorizontal: 16
    },
    checkField: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center"
    },
    divider: {
        width: 1,
        flex: 1,
        backgroundColor: "#1A2D5A",
        marginTop: 8
    },
    greyText: {
        color: "#9B9B9B",
        fontSize: 14,
        marginTop: 3,
        paddingBottom: 16
    },
    button: {
        borderRadius: 5,
        width: 100,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16
    },
    buttonText: {
        color: "white",
        fontSize: 14
    },
    restaurantContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 32
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: "contain",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }
});

export default styles;