import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';

import BackButton from '../../../../../components/backButton';
import Header from '../../../../../components/headerText';
import Button from '../../../../../components/button';
import InputField from '../../../../../components/textInput';

export default class Driver extends React.Component {

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
                            <Header title="Driver Name" />
                            <View style={[styles.inputContainer, { marginTop: 32 }]}>
                                <InputField placeholder="Vehicles Make" />
                            </View>
                            <View style={styles.inputContainer}>
                                <InputField placeholder="Vehicles Model" />
                            </View>
                            <View style={styles.inputContainer}>
                                <InputField placeholder="Vehicles Year" />
                            </View>
                            <View style={[styles.inputContainer, { marginBottom: 40 }]}>
                                <InputField placeholder="Desired driving hours/week" />
                            </View>
                            <Button blue={true} title="SAVE" func={this.saveFunc} />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}