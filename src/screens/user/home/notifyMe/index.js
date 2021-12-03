import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';

import styles from './styles';

import BackButton from '../../../../components/backButton';
import Header from '../../../../components/headerText';
import CartNotify from '../../../../components/cartNotify';
import AuthService from '../../../../services/AuthServices';
import NotifyMeItem from '../../../../components/notifyMeItem';
import AsyncStorage from '@react-native-community/async-storage';

export default class NotifyMe extends React.Component {

    authService = new AuthService();
    constructor(props) {
        super(props);

        this.state = {
            search: "",
            restaurants: [],
            filteredRestaurants: [],
            orderTime: ''
        }
    }

    changePassFunc = () => {
        this.props.navigation.navigate("ChangePassword");
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
                    style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                        <View style={styles.container}>
                            <BackButton navigation={this.props.navigation} />
                            <Header title="Notify me " />
                            <NotifyMeItem />
                            <NotifyMeItem />
                        </View>
                    </ScrollView>
                    <CartNotify onClick={() => {
                        this.props.navigation.navigate("ShoppingCart", {
                            items: [],
                            modifier: [],
                            order_time: this.state.orderTime
                        })
                    }} />
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}