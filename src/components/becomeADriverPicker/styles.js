import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: 8,
        backgroundColor: "white",
        paddingVertical: 16,
        paddingHorizontal: 24,
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
    dayText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#1A2D5A"
    },
    rowContainer: {
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "center",
        marginTop: 19
    },
    divider: {
        width: 11,
        height: 1,
        backgroundColor: "#CCCCCC",
        marginHorizontal: 6
    },
    timeContainer: {
        flex: 1,
        height: 43,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 19
    },
    greyText: {
        fontSize: 17,
        color: "#9B9B9B"
    },
});

export default styles;