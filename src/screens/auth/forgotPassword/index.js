import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';

import styles from './styles';

import BackButton from '../../../components/backButton';
import Header from '../../../components/headerText';
import InputField from '../../../components/textInput';
import Button from '../../../components/button';

export default class ForgotPassword extends React.Component {

    confirmCodeFunc = () => {
        this.props.navigation.navigate("ConfirmCode");
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
                            <Header title="Forgot password" />
                            <Text style={styles.message}>Please, enter your email address. You wil recieve a link to create a new password via email.</Text>
                            <View style={styles.inputContainer}>
                                <InputField placeholder="Email" />
                            </View>

                            <Button blue={true} title="SEND" func={this.confirmCodeFunc} />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}