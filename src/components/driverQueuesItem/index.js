import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

export default class DriverQueuesItem extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: "row", }}>
                    <View style={{ flex: 1, paddingRight: 16 }}>
                        <View style={styles.rowContainer}>
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.image}
                                    source={require("../../../assets/images/03.png")} />
                            </View>

                            <View style={styles.orderInfoContainer}>
                                <Text style={styles.boldText}>Order No1244</Text>
                                <Text style={[styles.normalText, { color: "#9B9B9B", marginTop: 3 }]}>Delivery Fee: $4.99</Text>
                            </View>
                        </View>
                        <View style={[styles.rowContainer, { marginTop: 10 }]}>
                            <Ionicons name="location-outline" size={16} color={"#1A2D5A"} />
                            <View style={{ marginLeft: 9 }}>
                                <Text style={[styles.boldText, { fontSize: 11 }]}>Retrieve from</Text>
                                <View style={{ marginTop: 3 }}>
                                    <Text style={[styles.normalText, { color: "#1A2D5A" }]}>Johnny's Pizza House</Text>
                                    <Text style={[styles.normalText, { color: "#1A2D5A" }]}>123 Main Road</Text>
                                    <Text style={[styles.normalText, { color: "#1A2D5A" }]}>South Village,USA</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={{ flex: 1, paddingLeft: 16 }}>
                        <View style={styles.rowContainer}>
                            <Image
                                style={{ width: 34, height: 34, resizeMode: "contain" }}
                                source={require("../../../assets/images/avatar.png")} />

                            <View style={styles.orderInfoContainer}>
                                <Text style={styles.boldText}>Jeep Worker</Text>
                                <Text style={[styles.normalText, { color: "#9B9B9B", marginTop: 3 }]}>1/23/45</Text>
                            </View>
                        </View>
                        <View style={[styles.rowContainer, { marginTop: 10 }]}>
                            <Ionicons name="location-outline" size={16} color={"#04A946"} />
                            <View style={{ marginLeft: 9 }}>
                                <Text style={[styles.boldText, { fontSize: 11 }]}>Deliver to</Text>
                                <View style={{ marginTop: 3 }}>
                                    <Text style={[styles.normalText, { color: "#1A2D5A" }]}>123 Main Road</Text>
                                    <Text style={[styles.normalText, { color: "#1A2D5A" }]}>South Village, USA</Text>
                                    <Text style={[styles.normalText, { color: "#1A2D5A" }]}>Floor 3 Apt B</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={[styles.compoletedButton, { backgroundColor: this.props.current ? "#1A2D5A" : "#04A946" }]}>
                    <Text style={styles.completedButtonText}>Completed</Text>
                </TouchableOpacity>
            </View>
        );
    }
}