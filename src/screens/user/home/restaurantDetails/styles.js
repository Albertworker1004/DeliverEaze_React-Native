import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#F9F9F9"
    },
    container: {
        flex: 1,
        paddingBottom: 30
    },
    scrollViewContainer: {
        paddingHorizontal: 16
    },
    inputContainer: {
        marginBottom: 23
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
    headerRightContainer: {
        alignItems: "flex-end"
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "flex-end"
    },
    headerIcon: {
        marginLeft: 9
    },
    message: {
        color: "#333333",
        marginTop: 56,
        marginBottom: 24
    },
    choppingBagPrice: {
        color: "#1A2D5A",
        fontSize: 16,
        fontWeight: "normal",
        marginRight: 9
    },
    headerShoppingButton: {
        flexDirection: "row",
        alignItems: "center"
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    mainImage: {
        width: null,
        height: 202,
        resizeMode: "cover",
        marginTop: 11
    },
    mainGreyText: {
        color: "#8D8D89",
        fontSize: 13,
        marginTop: 14
    },
    item: {
        color: "#1A2D5A",
        fontSize: 16,
        fontWeight: "bold"
    },
    itemContainer: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
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