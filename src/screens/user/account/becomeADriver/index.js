import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

import styles from './styles';

import BackButton from '../../../../components/backButton';
import Header from '../../../../components/headerText';
import InputField from '../../../../components/textInput';
import TimePicker from '../../../../components/becomeADriverPicker';
import Button from '../../../../components/button';

export default class BecomeADriver extends React.Component {

    submitFunc = () => {
        this.props.navigation.navigate("DriverThanks");
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.container}>
                    <ScrollView style={styles.scrollViewContainer}>
                        <View style={styles.container}>
                            <BackButton navigation={this.props.navigation} />
                            <Header title="Become A Driver" />

                            <View style={styles.inputContainer}>
                                <InputField placeholder="First Name" />
                            </View>
                            <View style={styles.inputContainer}>
                                <InputField placeholder="Last Name" />
                            </View>
                            <View style={styles.inputContainer}>
                                <InputField placeholder="Email" />
                            </View>
                            <View style={styles.inputContainer}>
                                <InputField placeholder="Phone" />
                            </View>

                            <Text style={styles.textBold}>Hours Available</Text>

                            <TimePicker day="Monday" />
                            <TimePicker day="Tuesday" />
                            <TimePicker day="Wednesday" />
                            <TimePicker day="Thursday" />
                            <TimePicker day="Friday" />
                            <TimePicker day="Saturday" />
                            <TimePicker day="Sunday" />
                            <View style={{ marginVertical: 20 }}>
                                <Button blue={true} title="SUBMIT" func={this.submitFunc} />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}