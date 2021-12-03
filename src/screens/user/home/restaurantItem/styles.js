import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#F9F9F9"
    },
    container: {
        flex: 1,
        paddingBottom: 35
    },
    scrollViewContainer: {
        paddingHorizontal: 16
    },
    mainImage: {
        width: null,
        height: 202,
        resizeMode: "cover",
        marginTop: 11
    },
    blackText: {
        color: "#1A2D5A",
        fontWeight: "bold",
        fontSize: 20,
    },
    rowContainer: {
        marginTop : 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    rowContainerModifier: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
        paddingHorizontal: 10
    },
    checkBox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center"
    },
    greyText: {
        color: "#9B9B9B",
        textAlign: "left",
    }
});

export default styles;