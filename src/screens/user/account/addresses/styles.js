import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#F9F9F9"
    },
    scrollViewContainer: {
        paddingHorizontal: 15
    },
    container: {
        flex: 1,
        paddingBottom: 40
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 32
    },
    boldText: {
        color: "#1A2D5A",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 15
    },
    text: {
        color: "#1A2D5A",
        fontSize: 16,
        fontWeight: "bold"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16
    },
    circle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)"
    }
});

export default styles;