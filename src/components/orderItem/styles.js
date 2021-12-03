import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: 8,
        backgroundColor: "white",
        paddingHorizontal: 16,
        paddingVertical: 18,
        marginTop: 17,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    boldText: {
        color: "#1A2D5A",
        fontWeight: "bold",
        fontSize: 16
    },
    greyText: {
        fontSize: 13,
        color: "#8D8D89",
        marginTop: 17
    }
});

export default styles;