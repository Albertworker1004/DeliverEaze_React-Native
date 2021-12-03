import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: 8,
        backgroundColor: "white",
        paddingHorizontal: 24,
        paddingVertical: 16,
        marginTop: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    boldText: {
        fontSize: 20,
        color: "#1A2D5A",
        fontWeight: "bold"
    },
    rowContainer: {
        flexDirection: "row",
        marginTop: 16
    },
    greyText: {
        fontSize: 17,
        color: "#9B9B9B"
    },
    timeContainer: {
        width: 123,
        height: 43,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 19,
        marginTop: 10
    },
    checkBox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center"
    },
    secondShiftButton: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 24
    }
});

export default styles;