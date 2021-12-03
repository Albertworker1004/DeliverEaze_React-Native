import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    inputFieldContainer: {
        width: "100%",
        height: 64,
        backgroundColor: "white",
        borderRadius: 5
    },
    inputField: {
        flex: 1,
        padding: 0,
        paddingLeft: 20,
        color: "#1A2D5A"
    },
    smallPlaceholder: {
        color: "#9B9B9B",
        fontSize: 11,
        marginLeft: 20,
        marginTop: 7
    },
    errorMessage: {
        color: "red",
        fontSize: 11,
        marginTop: 5,
        marginLeft: 20
    },
    editButtonContainer: {
        position: "absolute",
        right: 15,
        bottom: 20
    },
    editButtonText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#1A2D5A"
    }
});

export default styles;