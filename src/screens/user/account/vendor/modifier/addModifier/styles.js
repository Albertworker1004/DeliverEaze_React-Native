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
        marginVertical: 32,
    },
    boldText: {
        color: "#1A2D5A",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 15
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    greyText: {
        color: "#9B9B9B",
        fontSize: 14
    },
    checkBox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "rgba(0,0,0,0.2)"
    },
    miniContainer: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 4,
        padding: 16,
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
    blueText: {
        fontSize: 16,
        color: "#1A2D5A",
        fontWeight: "bold"
    }
});

export default styles;