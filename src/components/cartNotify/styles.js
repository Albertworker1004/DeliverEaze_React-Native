import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    cartCountContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 21,
        paddingRight: 16,
        paddingLeft: 16,
        backgroundColor: '#1A2D5A',
        height: 40,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cartTextGroup: {
        alignItems: "center"
    },
    viewCartText: {
        color: 'white',
        fontSize: 12,
        fontWeight: "bold"
    },
    bottomShoppingButton: {
        position: 'absolute',
        bottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        width: '100%',
    },
});

export default styles;