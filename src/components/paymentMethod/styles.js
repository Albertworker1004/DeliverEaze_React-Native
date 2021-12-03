import { StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const styles = StyleSheet.create({
    cardImage: {
        width: wp(93),
        height: wp(65.968),
    },
    cardNumber: {
        marginTop: wp(27.5),
        marginHorizontal: wp(10),
        fontSize: wp(5.5),
        color: 'white'
    },
    nameExpContainer: {
        backgroundColor: 'transparent',
        marginLeft: wp(10),
        marginRight: wp(25),
        marginTop: wp(13.5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardName: {
        fontSize: wp(3.25),
        color: 'white',
        textTransform: 'capitalize'
    },
    cardExpDate: {
        fontSize: wp(3.25),
        color: 'white',
        width: wp(20),
        backgroundColor: 'transparent'
    }
});

export default styles;