import React from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'

import styles from './styles'

const PaymentMethod = ({name = 'John Doe', expDate = '06/25', cardNumber= "0101424201010101"}) => {
    return (
        <View style={{position: 'relative'}}>
            <ImageBackground style={{...styles.cardImage}} source={require('../../../assets/images/blank-card.png')}>
                <Text style={{...styles.cardNumber}}><Text style={{letterSpacing: 5}}>**** **** **** </Text>{cardNumber.substr(12, 4)}</Text>
                <View style={{...styles.nameExpContainer}}>
                    <Text style={{...styles.cardName}}>{name}</Text>
                    <Text style={{...styles.cardExpDate}}>{expDate}</Text>
                </View>
            </ImageBackground>
        </View>
    )
}

export default PaymentMethod