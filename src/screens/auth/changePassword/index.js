import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';

import styles from './styles';

import BackButton from '../../../components/backButton';
import Header from '../../../components/headerText';
import InputField from '../../../components/textInput';
import Button from '../../../components/button';

export default class ChangePassword extends React.Component {

    returnToLoginFunc = () => {
        this.props.navigation.navigate("SignIn");
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
                            <Header title="Change Password" />
                            <Text style={styles.message}>Enter your new password and confirm.</Text>
                            <View style={styles.inputContainer}>
                                <InputField placeholder="New Password" secure={true} />
                            </View>
                            <View style={styles.inputContainer}>
                                <InputField placeholder="Confirm Password" secure={true} />
                            </View>
                            <Button blue={true} title="RETURN TO LOGIN" func={this.returnToLoginFunc} />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView >
        );
    }
}