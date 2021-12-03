import React from 'react';
import { Text, View, TouchableOpacity, Switch, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';

export default class VendorItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            available: true
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require("../../../assets/images/jelo1.png")} />
                <View style={{ flex: 1, paddingRight: 15 }}>
                    <View style={styles.rowContainer2}>
                        <Text style={styles.boldText}>Item No{this.props.number}</Text>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("VendorAddItems", { edit: true })}
                            style={{ padding: 5 }}>
                            <Entypo name="edit" size={18} color={"#1A2D5A"} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.greyText}>Category Name</Text>
                    <View style={[styles.rowContainer2, { marginTop: 9 }]}>
                        <Text style={styles.boldText}>$10</Text>
                        <View style={styles.rowContainer}>
                            <Text style={[styles.availableText, { color: this.state.available ? "#04A946" : "#AEAEAE" }]}>{this.state.available ? "Available" : "Unavailable"}</Text>
                            <Switch
                                trackColor={{ false: "#AEAEAE", true: "#04A946" }}
                                thumbColor={"white"}
                                ios_backgroundColor="#AEAEAE"
                                onValueChange={() => this.setState({ available: !this.state.available })}
                                value={this.state.available}
                            />
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}