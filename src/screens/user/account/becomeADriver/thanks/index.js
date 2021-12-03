import React from 'react';
import { View, Image, Text, SafeAreaView } from 'react-native';

import styles from './styles';

import Header from '../../../../../components/headerText';
import Button from '../../../../../components/button';

export default class Thanks extends React.Component {

    continueFunc = () => {
        this.props.navigation.navigate("Home");
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.container}>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Header title="Thank you" />
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={require("../../../../../../assets/images/bags.png")} />
                            <View style={styles.carIcon}>
                                <Image
                                    style={styles.image}
                                    source={require("../../../../../../assets/icons/car1.png")} />
                            </View>
                        </View>
                        <Text style={styles.boldText}>Thank you for sharing your interest in becoming a driver for DeliverEaze!</Text>
                        <Text style={styles.normalText}>One of our team members  will be in contact with you soon.</Text>
                    </View>
                    <Button blue={true} title="CONTINUE" func={this.continueFunc} />
                </View>
            </SafeAreaView>
        );
    }
}