import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#F9F9F9"
    },
    container: {
        flex: 1
    },
    scrollViewContainer: {
        //paddingHorizontal: 16
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
        paddingTop: 24,
        paddingHorizontal: 16
    },
    mainHeaderText: {
        color: "#1A2D5A",
        fontSize: 24,
        fontWeight: "bold"
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
    upcomingRestaurantsImage: {
        width: 90,
        height: 90,
        resizeMode: "cover",
        borderRadius: 8,
        marginRight: 10
    },
    modalMainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.08)"
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
        marginVertical: 25
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
    },
});

export default styles;