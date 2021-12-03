import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, Image } from 'react-native';

import styles from './styles';

import BackButton from '../../../../components/backButton';
import Header from '../../../../components/headerText';

export default class Support extends React.Component {

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                        <View style={styles.container}>
                            <BackButton navigation={this.props.navigation} />
                            <Header title="Reward Program" />
                            <Text style={styles.boldText}>Reward Program Explination</Text>
                            <Text style={styles.normalText}>Send this link  yo your frieasdjkahsd askjdhakjshd asdjhak jsdakhsd ajhsdk asdh asd akjshdkjahsjdkh akjshd gfuwqyegf kasdhgfkasuydgf aefg qwlef lwed</Text>
                            <Image
                                style={styles.image}
                                source={require("../../../../../assets/images/reward.png")} />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}