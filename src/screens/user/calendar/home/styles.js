import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#F9F9F9"
    },
    container: {
        flex: 1
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
    mainContainer: {
        flex: 1,
        paddingVertical: 25,
        paddingHorizontal: 15,
    },
    itemRowContainer: {
        flexDirection: "row",
        marginTop: 16
    },
    headerIcon: {
        marginLeft: 9
    },
    modalMainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalInnerContainer: {
        width: "85%",
        borderRadius: 8,
        backgroundColor: "white",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        paddingVertical: 25,
        paddingHorizontal: 5,
    },
    logo: {
        width: "80%",
        resizeMode: "contain"
    },
    text: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#74CCDC",
        textAlign : 'center'
    },
    secondaryText: {
        marginVertical: 10,
        fontSize: 15,
        fontWeight: "normal",
        color: "#74CCDC",
        textAlign : 'center'
    }
});

export default styles;