import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 30
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#F9F9F9"
    },
    imageContainer: {
        width: 300,
        height: 309,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 28
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    carIcon: {
        position: "absolute",
        width: 140,
        height: 134,
        resizeMode: "contain"
    },
    boldText: {
        fontWeight: "bold",
        color: "#1A2D5A",
        fontSize: 16,
        marginTop: 50,
        textAlign: "center"
    },
    normalText: {
        color: "#1A2D5A",
        textAlign: "center",
        marginTop: 16,
        width: 250
    }
});

export default styles;