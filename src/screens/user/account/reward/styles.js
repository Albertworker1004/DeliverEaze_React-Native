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
    normalText: {
        color: "#1A2D5A",
        marginBottom: 40,
        marginTop: 16,
        fontSize: 14
    },
    image: {
        width: null,
        height: 202,
        resizeMode: "contain",
        marginTop: 11
    }
});

export default styles;