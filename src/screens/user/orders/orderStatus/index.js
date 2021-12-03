import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

import Header from '../../../../components/headerText';
import BackButton from '../../../../components/backButton';

export default class Home extends React.Component {

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.container}>
                    <ScrollView contentContainerStyle={{ paddingHorizontal: 15 }}>
                        <View style={styles.container}>
                            <BackButton navigation={this.props.navigation} />
                            <Header title="Order Status" />

                            <View style={styles.restaurantContainer}>
                                <Image
                                    style={styles.image}
                                    source={require("../../../../../assets/images/coffee.png")} />
                                <View>
                                    <Text style={styles.boldText}>Name Restaraunt</Text>
                                    <Text style={[styles.greyText, { paddingBottom: 0, marginTop: 3 }]}>Order No - 1234567</Text>
                                    <Text style={[styles.greyText, { paddingBottom: 0, marginTop: 3 }]}>Expected delivery 45 Mins</Text>
                                </View>
                            </View>

                            <View style={styles.rowContainer}>
                                <View style={{ alignItems: "center" }}>
                                    <View style={[styles.checkField, { backgroundColor: "#1A2D5A" }]}>
                                        <MaterialIcons name="done" size={17} color={"white"} />
                                    </View>
                                    <View style={styles.divider} />
                                </View>
                                <View style={{ marginLeft: 32 }}>
                                    <Text style={styles.boldText}>Order Placed</Text>
                                    <Text style={styles.greyText}>We have received  your order  6:40 PM</Text>
                                </View>
                            </View>
                            <View style={styles.rowContainer}>
                                <View style={{ alignItems: "center" }}>
                                    <View style={[styles.checkField, { backgroundColor: "#1A2D5A" }]}>
                                        <MaterialIcons name="done" size={17} color={"white"} />
                                    </View>
                                    <View style={styles.divider} />
                                </View>
                                <View style={{ marginLeft: 32 }}>
                                    <Text style={styles.boldText}>Order Confirmed</Text>
                                    <Text style={styles.greyText}>We have received  your order  6:40 PM</Text>
                                </View>
                            </View>
                            <View style={styles.rowContainer}>
                                <View style={{ alignItems: "center" }}>
                                    <View style={[styles.checkField, { backgroundColor: "#1A2D5A" }]}>
                                        <MaterialIcons name="done" size={17} color={"white"} />
                                    </View>
                                    <View style={styles.divider} />
                                </View>
                                <View style={{ marginLeft: 32 }}>
                                    <Text style={styles.boldText}>Order in Preparation</Text>
                                    <Text style={styles.greyText}>We have received  your order  6:40 PM</Text>
                                </View>
                            </View>
                            <View style={styles.rowContainer}>
                                <View style={{ alignItems: "center" }}>
                                    <View style={[styles.checkField, { backgroundColor: "#1A2D5A" }]}>
                                        <MaterialIcons name="done" size={17} color={"white"} />
                                    </View>
                                    <View style={styles.divider} />
                                </View>
                                <View style={{ marginLeft: 32 }}>
                                    <Text style={styles.boldText}>On The Way</Text>
                                    <Text style={styles.greyText}>We have received  your order  6:40 PM</Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <TouchableOpacity style={[styles.button, { backgroundColor: "#1A2D5A", marginRight: 8 }]}>
                                            <Text style={styles.buttonText}>Track Order</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.button, { backgroundColor: "#74CCDC" }]}>
                                            <Text style={styles.buttonText}>Call</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.rowContainer}>
                                <View style={{ alignItems: "center" }}>
                                    <View style={[styles.checkField, { borderWidth: 1 }]}>
                                        <MaterialIcons name="done" size={17} color={"white"} />
                                    </View>
                                </View>
                                <View style={{ marginLeft: 32 }}>
                                    <Text style={styles.boldText}>Delivered</Text>
                                    <Text style={styles.greyText}>Waiting</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}