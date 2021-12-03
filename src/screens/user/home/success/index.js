import React from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';

import styles from './styles';

import Header from '../../../../components/headerText';
import Button from '../../../../components/button';

export default class Success extends React.Component {

    continueFunc = () => {
        this.props.navigation.navigate("Home");
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.container}>
                    <View style={styles.mainContainer}>
                        <Header title="Success" />
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image1}
                                source={require("../../../../../assets/images/bags.png")} />
                            <View style={{ position: "absolute" }}>
                                <Image
                                    style={styles.image2}
                                    source={require("../../../../../assets/images/box1.png")} />
                            </View>
                        </View>
                        <Text style={styles.boldText}>Your order from "Jeep Worker"</Text>
                        <Text style={styles.normalText}>Cafe has successfully been ordered and will be delivered between 11:30 - 11:40</Text>
                    </View>
                    <Button blue="true" title="CONTINUE" func={this.continueFunc} />
                </View>
            </SafeAreaView>
        );
    }
}