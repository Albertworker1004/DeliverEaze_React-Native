import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: "white",
        paddingVertical: 20,
        marginTop: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    boldText: {
        color: "#1A2D5A",
        fontWeight: "bold",
        fontSize: 16
    },
    greyText: {
        fontSize: 17,
        color: "#9B9B9B"
    },
    rowContainer: {
        flexDirection: "row",
        marginTop: 16
        //alightItems: "center"
    },
    timeContainer: {
        flex: 1,
        height: 43,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 19
    },
    chooseButton: {
        width: "50%",
        height: 40,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2F80ED",
        alignSelf: "center"
    },
    chooseButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 12
    },
    pickerContainer: {
        width: "100%",
        height: 44,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        paddingLeft: 16,
        marginTop: 16
    }
});

export default styles;