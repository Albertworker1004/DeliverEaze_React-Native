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
        marginBottom: 8
    },
    forgotPasswordButtonText: {
        color: "#1A2D5A",
        fontWeight: "bold"
    },
    socialLoginContainer: {
        alignItems: "center",
        marginBottom: 44,
        marginTop: 41
    },
    rowContainer: {
        flexDirection: "row",
        marginTop: 12
    },
    socialButtonContainer: {
        width: 92,
        height: 64,
        backgroundColor: "white",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    socialButtonIcon: {
        width: 24,
        height: 24,
        resizeMode: "contain"
    },
    errorContainer: {
        width: "100%",
        height: 63,
        justifyContent: "flex-end"
    },
    errorText: {
        color: "red",
        marginBottom: 5,
        marginLeft: 2
    },
    confirmPasswordDoneContainer: {
        position: "absolute",
        right: 5,
        bottom: 13
    }
});

export default styles;