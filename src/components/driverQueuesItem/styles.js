import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: 8,
        backgroundColor: "white",
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 16
    },
    rowContainer: {
        flexDirection: "row"
    },
    boldText: {
        fontSize: 12,
        color: "#1A2D5A",
        fontWeight: "bold"
    },
    normalText: {
        fontSize: 10
    },
    orderInfoContainer: {
        marginLeft: 11
    },
    imageContainer: {
        width: 32,
        height: 32,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    divider: {
        width: 1,
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.2)"
    },
    compoletedButton: {
        width: 100,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 18,
        alignSelf: "flex-end"
    },
    completedButtonText: {
        color: "white",
        fontSize: 14
    }
});

export default styles;