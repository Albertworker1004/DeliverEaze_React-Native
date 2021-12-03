import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import styles from './styles';

export default class CalendarItem extends React.Component {

    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                if(this.props.restaurant)    
                this.props.navigation.navigate("Restaurant", {
                    restaurant: this.props.restaurant,
                })
                else
                this.props.errorFunc()
                }}
                style={{...styles.container, backgroundColor: this.props.today ? '#74CCDC' : 'white'}}>
                <Text style={styles.dayText}>{this.props.day}</Text>
                <Text style={{...styles.dateText, color: this.props.today ? '#1A2D5A' : '#959595'}}>{this.props.date}</Text>
                <Image
                    style={styles.restaurantImage}
                    source={this.props.restaurant ? {uri: this.props.restaurant.restaurant_logourl} : undefined} 
                    resizeMode="cover"
                />
                <Text style={styles.restaurantName}>{this.props.restaurant ? this.props.restaurant.restaurant_name : ''}</Text>
            </TouchableOpacity>
        );
    }
}