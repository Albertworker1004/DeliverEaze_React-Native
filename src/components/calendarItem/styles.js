import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: "white",
        alignItems: "center",
        paddingVertical: 7,
        marginHorizontal: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dayText: {
        color: "#1A2D5A",
        fontSize: 14,
        fontWeight: "bold"
    },
    dateText: {
        color: "#959595",
        fontSize: 10,
        marginTop: 2
    },
    restaurantName: {
        textAlign: "center",
        color: "#1A2D5A",
        fontSize: 7,
        marginTop: 8
    },
    restaurantImage: {
        width: 30,
        height: 25,
        resizeMode: "contain",
        marginTop: 6
    }
});

export default styles;