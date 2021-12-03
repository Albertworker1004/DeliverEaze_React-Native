import { StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#F9F9F9"
    },
    scrollViewContainer: {
        paddingHorizontal: wp(3.5),
        flex: 1
    },
    container: {
        flex: 1
    },
    boldText: {
        color: "#1A2D5A",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 24
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10
    },
    checkBox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderColor: "#333333",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        marginLeft: 13,
        color: "#222222"
    },
    cardImage: {
        width: null,
        height: 202,
        resizeMode: "contain",
        marginTop: 11
    },
    addPaymentContainer: {
        position: "absolute",
        right: 10,
        top: 10
    },
    addIcon: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
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
    closeButtonContainer: {
        position: "absolute",
        right: 0
    }
});

export default styles;