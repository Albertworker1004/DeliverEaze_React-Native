import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#F9F9F9"
    },
    container: {
        flex: 1,
        paddingTop: 30,
        paddingBottom: 13
    },
    headerTextContainer: {
        marginLeft: 15
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 32,
        marginBottom: 15,
        paddingHorizontal: 15
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        resizeMode: "cover"
    },
    userInfoContainer: {
        marginLeft: 16
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1A2D5A"
    },
    userEmail: {
        fontSize: 14,
        color: "#9B9B9B"
    },
    accountItem: {
        width: "100%",
        height: 71,
        borderBottomWidth: 1,
        borderColor: "rgba(0,0,0,0.05)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15
    },
    accountItemTitle: {
        fontSize: 16,
        color: "#1A2D5A",
        fontWeight: "bold"
    },
    accountItemGrey: {
        fontSize: 11,
        color: "#9B9B9B",
        marginTop: 6
    }
});

export default styles;