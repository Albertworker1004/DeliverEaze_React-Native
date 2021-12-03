import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';

import BackButton from '../../../../../components/backButton';
import Header from '../../../../../components/headerText';
import DriverQueuesItem from '../../../../../components/driverQueuesItem';

export default class Queues extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            current: true
        }
    }

    saveFunc = () => {
        this.props.navigation.navigate("DriverHome");
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                        <View style={styles.container}>
                            <BackButton navigation={this.props.navigation} />
                            <Header title="My Queues" />
                            <View style={styles.rowContainer}>
                                <TouchableOpacity
                                    disabled={this.state.current}
                                    onPress={() => this.setState({ current: !this.state.current })}
                                    style={[styles.button, { backgroundColor: this.state.current ? "#74CCDC" : "transparent" }]}>
                                    <Text style={[styles.text, { color: this.state.current ? "white" : "#1A2D5A" }]}>Current</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    disabled={!this.state.current}
                                    onPress={() => this.setState({ current: !this.state.current })}
                                    style={[styles.button, { backgroundColor: !this.state.current ? "#74CCDC" : "transparent" }]}>
                                    <Text style={[styles.text, { color: !this.state.current ? "white" : "#1A2D5A" }]}>Completed</Text>
                                </TouchableOpacity>
                            </View>
                            <DriverQueuesItem current={this.state.current} />
                            <DriverQueuesItem current={this.state.current} />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}