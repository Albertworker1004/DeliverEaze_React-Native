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
        paddingHorizontal: 16
    },
    inputContainer: {
        marginBottom: 23
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    skipButton: {
        padding: 5,
        alignSelf: "flex-end"
    },
    skipButtonText: {
        color: "#1A2D5A",
        fontSize: 15,
        fontWeight: "bold"
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
        marginBottom: 22
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
        color: "#1A2D5A",
        marginLeft: 13
    },
    cvvIcon: {
        position: "absolute",
        right: 22
    },
    masterCardIcon: {
        width: 32,
        height: 25,
        resizeMode: "contain"
    }
});

export default styles;