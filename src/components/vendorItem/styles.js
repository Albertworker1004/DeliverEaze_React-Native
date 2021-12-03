import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
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
    boldText: {
        color: "#1A2D5A",
        fontWeight: "bold",
        fontSize: 16
    },
    greyText: {
        color: "#9b9b9b",
        fontSize: 14
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    availableText: {
        fontWeight: "bold",
        fontSize: 16,
        marginRight: 12
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: "contain"
    }
});

export default styles;