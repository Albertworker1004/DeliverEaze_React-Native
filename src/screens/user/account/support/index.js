import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

import styles from './styles';

import BackButton from '../../../../components/backButton';
import Header from '../../../../components/headerText';
import Button from '../../../../components/button';

export default class Support extends React.Component {

    contactUsFunc = () => {
        //this.props.navigation.navigate("RestaurantDetails");
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
                            <Header title="Support" />
                            <Text style={styles.boldText}>Message About Support</Text>
                            <Text style={styles.normalText}>Send this link  yo your frieasdjkahsd askjdhakjshd asdjhak jsdakhsd ajhsdk asdh asd akjshdkjahsjdkh akjshd gfuwqyegf kasdhgfkasuydgf aefg qwlef lwed</Text>
                            <Button blue={true} title="CONTACT US EMAIL" func={this.contactUsFunc} />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}