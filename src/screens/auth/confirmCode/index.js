import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';

import styles from './styles';

import BackButton from '../../../components/backButton';
import Header from '../../../components/headerText';
import InputField from '../../../components/textInput';
import Button from '../../../components/button';

export default class ConfirmCode extends React.Component {

    changePassFunc = () => {
        this.props.navigation.navigate("ChangePassword");
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
                            <Header title="Confirm Code" />
                            <Text style={styles.message}>Enter the verification code sent to your email address and reset password.</Text>
                            <View style={styles.inputContainer}>
                                <InputField placeholder="Enter Code" />
                            </View>
                            <Button blue={true} title="CONFIRM" func={this.changePassFunc} />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}