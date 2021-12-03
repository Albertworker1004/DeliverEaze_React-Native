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
    boldText: {
        fontSize: 16,
        color: "#1A2D5A",
        fontWeight: "bold",
        marginTop: 32
    },
    link: {
        fontSize: 16,
        textDecorationLine: "underline",
        color: "#1A2D5A",
        marginTop: 16
    }
});

export default styles;