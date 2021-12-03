import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#F9F9F9"
    },
    container: {
        flex: 1,
        paddingBottom: 35
    },
    scrollViewContainer: {
        paddingHorizontal: 16
    },
    mainImage: {
        width: '100%',
        height: 202,
        marginTop: 11
    },
    blackText: {
        color: "#1A2D5A",
        fontWeight: "bold",
        fontSize: 14
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    rowContainerModifier: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 16
    },
    checkBox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)"
    },
    greyText: {
        color: "#9B9B9B",
        fontSize: 14
    },
    mainImage: {
        width: '100%',
        height: 202,
        marginTop: 11
    },
    masterCardIcon: {
        width: 32,
        height: 25,
        resizeMode: "contain",
        marginRight: 16
    },
    addPaymentMethod: {
        padding: 5,
        marginLeft: 10
    },
    modalMainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalContainer: {
        backgroundColor: "#F9F9F9",
        width: "85%",
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal: 16,
        paddingVertical: 26,
    },
    closeButtonContainer: {
        position: "absolute",
        right: 0
    },
    modalBoldText: {
        color: "#1A2D5A",
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center"
    },
    inputContainer: {
        marginBottom: 23
    },    
    cvvIcon: {
        position: "absolute",
        right: 22
    },
    masterCardIcon: {
        width: 32,
        height: 25,
        resizeMode: "contain"
    },
    rowContainer1: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10
    },
    defaultMiniContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: 20,
        height: 20,
        borderRadius: 4,
        backgroundColor: "#1A2D5A"
    },
    defaultText: {
        color: "#222222",
        marginLeft: 13
    },
});

export default styles;