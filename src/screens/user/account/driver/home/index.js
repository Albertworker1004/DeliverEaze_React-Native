import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';

import BackButton from '../../../../../components/backButton';
import Header from '../../../../../components/headerText';

export default class Driver extends React.Component {

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.container}>
                    <ScrollView >
                        <View style={styles.container}>
                            <View style={styles.headerContainer}>
                                <BackButton navigation={this.props.navigation} />
                                <Header title="Driver Name" />
                            </View>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("DriverVehicles")}
                                style={styles.accountItem}>
                                <View>
                                    <Text style={styles.accountItemTitle}>My Vehicles</Text>
                                </View>
                                <Entypo name="chevron-thin-right" size={16} color={"#1A2D5A"} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("DriverHours")}
                                style={styles.accountItem}>
                                <View>
                                    <Text style={styles.accountItemTitle}>My Hours</Text>
                                </View>
                                <Entypo name="chevron-thin-right" size={16} color={"#1A2D5A"} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("DriverQueues")}
                                style={styles.accountItem}>
                                <View>
                                    <Text style={styles.accountItemTitle}>My Queues</Text>
                                </View>
                                <Entypo name="chevron-thin-right" size={16} color={"#1A2D5A"} />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}