import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#F9F9F9"
    },
    container: {
        flex: 1,
        paddingVertical: 36
    },
    headerNameText: {
        color: "#1A2D5A",
        fontSize: 15,
        fontWeight: "bold"
    },
    headerBlueText: {
        color: "#1A2D5A",
        fontSize: 10,
        fontWeight: "bold"
    },
    headerRightContainer: {
        alignItems: "flex-end"
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "flex-end"
    },
    headerIcon: {
        marginLeft: 9
    },
    mainImage: {
        width: null,
        height: 202,
        resizeMode: "contain",
        marginTop: 11
    },
    boldText: {
        color: "#1A2D5A",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 30
    }
});

export default styles;