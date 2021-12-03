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
        paddingHorizontal: 15
    },
    inputField: {
        width: "100%",
        borderRadius: 4,
        height: 64,
        backgroundColor: "white",
        color: "#1A2D5A",
        textDecorationLine: "underline",
        marginVertical: 40,
        paddingLeft: 16
    }
});

export default styles;