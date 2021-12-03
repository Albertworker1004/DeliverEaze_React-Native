import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';

export default class OrderItem extends React.Component {

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate("OrderStatus")}
                style={styles.container}>
                <View style={styles.rowContainer}>
                    <Text style={styles.boldText}>Item No{this.props.number}</Text>
                    <Text style={styles.boldText}>${this.props.price}</Text>
                </View>
                <Text style={styles.greyText}>Lorem Ipsus is simply dummytasd  asmndbasd amsd asdasd asmd asd asdbajksbda sdjhasbd</Text>
            </TouchableOpacity>
        );
    }
}