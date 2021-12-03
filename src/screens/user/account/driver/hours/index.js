import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';

import BackButton from '../../../../../components/backButton';
import Header from '../../../../../components/headerText';
import Button from '../../../../../components/button';
import HoursItem from '../../../../../components/hoursItem';

export default class Hours extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            
        }
    }

    componentDidMount() {
        console.log(this.props)
    }

    saveFunc = () => {
        this.props.navigation.goBack();
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
                            <Header title="My Hours" />

                            <HoursItem
                                day="Monday"
                                second={true}  />
                            <HoursItem day="Tuesday" second={false} />
                            <HoursItem day="Wednesday" second={false} />
                            <HoursItem day="Thursday" second={false} />
                            <HoursItem day="Friday" second={false} />
                            <HoursItem day="Saturday" second={false} />
                            <HoursItem day="Sunday" second={false} />

                            <View style={styles.buttonContainer}>
                                <Button blue={true} title="SAVE" func={this.saveFunc} />
                            </View>

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}