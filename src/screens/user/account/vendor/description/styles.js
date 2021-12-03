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
    inputField: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 8,
        minHeight: 130,
        marginVertical: 32,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        color: "#1A2D5A",
        padding: 16
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
        marginBottom: 40
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
        resizeMode: "cover"
    }
});

export default styles;