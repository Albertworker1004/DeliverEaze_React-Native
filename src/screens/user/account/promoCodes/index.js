import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

import styles from './styles';

import BackButton from '../../../../components/backButton';
import Header from '../../../../components/headerText';

export default class Website extends React.Component {

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.container}>
                    <ScrollView style={styles.scrollViewContainer}>
                        <View style={styles.container}>
                            <BackButton navigation={this.props.navigation} />
                            <Header title="Promo Codes" />

                            <Text style={styles.boldText}>Invite Your Friends</Text>
                            <Text style={{ marginTop: 16, color: "#1A2D5A" }}>Send this link to your friends and receive free deliveries:</Text>
                            <Text style={styles.link}>www.123456789.com</Text>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}