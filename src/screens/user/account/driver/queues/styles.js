import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#F9F9F9"
    },
    container: {
        flex: 1
    },
    scrollViewContainer: {
        paddingHorizontal: 15,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        height: 28,
        width: "90%",
        backgroundColor: "rgba(118,118,128,0.12)",
        alignSelf: "center",
        marginTop: 24,
    },
    button: {
        flex: 1,
        height: 24,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 13
    }
});

export default styles;