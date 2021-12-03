import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    circleBadge: {
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#74CCDC',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    badgeCount: {
        color: 'white',
        fontSize: 12,
    }
});

export default styles;