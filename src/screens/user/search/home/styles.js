import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#F9F9F9"
    },
    container: {
        flex: 1,
        width: "100%"
    },
    headerContainer: {
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 24,
        borderBottomWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        paddingBottom: 20
    },
    headerNameText: {
        color: "#1A2D5A",
        fontSize: 15,
        fontWeight: "bold"
    },
    headerBlueText: {
        color: "#1A2D5A",
        fontSize: 10,
        fontWeight: "bold"
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "flex-end"
    },
    headerIcon: {
        marginLeft: 9
    },
    headerRightContainer: {
        alignItems: "flex-end"
    },
    mainContainer: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 22
    },
    searchContainer: {
        width: "100%",
        height: 36,
        borderRadius: 10,
        backgroundColor: "rgba(118,118,128,0.12)",
        marginTop: 22,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 11
    },
    searchInputField: {
        flex: 1,
        height: "100%",
        padding: 0,
        marginLeft: 11,
        color: "rgba(0,0,0,0.36)"
    },
    blueText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1A2D5A",
        marginTop: 24
    },
    boldText: {
        fontSize: 16,
        color: "#1A2D5A",
        fontWeight: "bold",
        marginTop: 16
    },
    button: {
        width: 100,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: "#1A2D5A",
        marginRight: 12
    },
    buttonText: {
        color: "white",
        fontSize: 14
    }
});

export default styles;