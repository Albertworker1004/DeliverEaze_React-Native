import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, Image } from 'react-native';

import styles from './styles';

import Header from '../../../../components/headerText';
import OrderItem from '../../../../components/orderItem';
import CartNotify from '../../../../components/cartNotify';
import AsyncStorage from '@react-native-community/async-storage';
import AuthService from '../../../../services/AuthServices';

export default class Home extends React.Component {

    authService = new AuthService();
    constructor(props) {
        super(props);

        this.state = {
            orderTime: ''
        }
    }

    componentDidMount(){
        this.getVendorList();
    }

    getVendorList = async() => {
        let formData = new FormData();
        formData.append('userID', (await AsyncStorage.getItem('userID')).toString());
        console.log("===========================================")
        console.log(AsyncStorage.getItem('userID'))
        this.authService.getVendorList(formData, async (res) => {
            if (res.response.vendorlist) {
                if (res.response.vendorlist.length > 0) {
                    let data = res.response.vendorlist
                    this.setState({orderTime: data[0]['order_time']})
                    let restaurants = []
                    data.forEach((vendor, index)=>{
                        restaurants.push(vendor);
                    })
                    console.log(restaurants)
                    console.log("RESTAURANTS")
                    restaurants = restaurants.sort((a,b)=>{
                        return a.restaurant_name < b.restaurant_name ? -1 : 1
                    })
                    console.log(restaurants)
                    this.setState({restaurants: restaurants, filteredRestaurants: restaurants, search: ""})
                }
            }
            this.setState({reload: false})
        });
    }


    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={[styles.container, { paddingVertical: 0 }]}>
                    <ScrollView contentContainerStyle={{ paddingHorizontal: 15 }}>
                        <View style={styles.container}>
                            <Header title="Orders" />
                            <Image
                                style={styles.mainImage}
                                source={require("../../../../../assets/images/slika1.png")} />
                            <Text style={styles.boldText}>Current Orders</Text>

                            <OrderItem number={1} price={10} navigation={this.props.navigation} />
                            <Text style={styles.boldText}>Past Orders</Text>
                            <OrderItem number={2} price={12} navigation={this.props.navigation} />
                        </View>
                    </ScrollView>
                    <CartNotify onClick={()=>{
                        this.props.navigation.navigate("ShoppingCart", {
                            items : [],
                            modifier : [],
                            order_time: this.state.orderTime
                        })
                    }} />
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}