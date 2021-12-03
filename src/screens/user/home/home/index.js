import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Image, Dimensions, TouchableOpacity, RefreshControl, FlatList, Modal } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';

import styles from './styles';

import WelcomeModal from '../../../../components/welcomeHomeModal';
import CartNotify from '../../../../components/cartNotify';

import AuthService from '../../../../services/AuthServices';
import AsyncStorage from '@react-native-community/async-storage'
import Button from '../../../../components/button';
import { initUser, setAddress } from '../../../../redux/actions';

const width = Dimensions.get("screen").width;

class Home extends React.Component {

    authService = new AuthService();

    constructor(props) {
        super(props);

        this.state = {
            reload: false,
            modalVisible: false,
            todaysFeaturedRestaurant: {},
            vendorList: [],
            fullname: '',
            selectedAddress: 0,
            orderTime: ''
        }
    }


    componentDidMount = () => {
        this.getVendorList()
        this.getUserData()
    }

    getUserData = () => {
        this.setState({reload: true})
        console.log('calling')
        let formdata = new FormData();
        formdata.append('userID', this.props.auth.userID);
        this.authService.getUserDetails(formdata, async (res) => {
            console.log(res.response.userinfo)
            const user = {
                userID: res.response.userinfo.userID,
                name: res.response.userinfo.fullname,
                email: res.response.userinfo.email,
                phoneNumber: res.response.userinfo.phonenumber,
                userPhoto: res.response.userinfo.photourl,
                address: res.response.userinfo.address.split(' & '),
                paymentMethods: res.response.paymentmethodslist
            };
            console.log(user, 'PREUBA')
            await this.props.initUser(user);
        });
        this.setState({reload: false})
    };

    getVendorList = async () => {
        let formData = new FormData();
        formData.append('userID', this.props.auth.userID);
        AsyncStorage.setItem('userID', this.props.auth.userID);
        console.log("=======================================+++++++++++++++++++++++++++++++++++++++++++====")
        console.log(this.props.auth.userID)
        console.log("=======================================+++++++++++++++++++++++++++++++++++++++++++====")
        console.log((await AsyncStorage.getItem("userID")).toString())
        console.log("=======================================+++++++++++++++++++++++++++++++++++++++++++====")
        // console.log(AsyncStorage.getItem('userID'))
        // console.log(this.props.auth.userID, 'hola')
        this.authService.getVendorList(formData, async (res) => {
            if (res.response.vendorlist) {
                if (res.response.vendorlist.length > 0) {
                    let data = res.response.vendorlist
                    this.setState({orderTime: data[0]['order_time']})
                    console.log(data)
                    let upcoming = []
                    let featuredRestaurant = {};
                    let today = new Date();
                    today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0)
                    data.forEach((vendor, index)=>{
                        let date = new Date(vendor.featured_date);
                        console.log(date.getFullYear(), date.getDate(), date.getMonth()+1, date.getTime(), date.getTime() > today.getTime(), date.getTime() === today.getTime())
                        if(date.getTime() > today.getTime()){
                            upcoming.push(vendor);
                        }else if(date.getTime() === today.getTime()){
                            featuredRestaurant = vendor;
                        }
                    })
                    upcoming = upcoming.sort((a,b)=>{
                        const timeA = new Date(a.featured_date)
                        const timeB = new Date(b.featured_date)
                        return timeA.getTime() - timeB.getTime();
                    })
                    this.setState({todaysFeaturedRestaurant: featuredRestaurant, vendorList: upcoming})
                }
            }
        });
    }

    changePassFunc = () => {
        this.props.navigation.navigate("ChangePassword");
    }

    initAsyncStorage = async() => {

    }

    renderItem = ({ item, index }) => {
        if (item.restaurant_logourl != '') {
            return (
                <TouchableOpacity onPress={() => {
                    this.initAsyncStorage()
                    this.props.navigation.navigate("RestaurantDetails",
                        {
                            restaurant: item
                        })
                }
                }>
                    <Image
                        style={styles.upcomingRestaurantsImage}
                        source={{ uri: item.restaurant_logourl }} />
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.container}>
                    <ScrollView
                        contentContainerStyle={styles.scrollViewContainer}
                        refreshControl={
                            <RefreshControl
                                colors={["red", "green", "blue"]}
                                tintColor='blue'
                                refreshing={this.state.reload}
                                onRefresh={() => {
                                    this.getVendorList()
                                    this.getUserData()
                                }}
                            />
                        }
                    >
                        <View style={styles.container}>
                            <WelcomeModal text1={this.props.route.params.login == true ? "Welcome Back to" : 'Welcome to'} text2="DeliverEaze" />
                            <View style={styles.headerContainer}>
                                <Text style={styles.headerNameText}>{this.props.auth.name}</Text>
                                <TouchableOpacity onPress={()=>{this.setState({showPicker: true})}} style={styles.headerRightContainer}>
                                    <Text style={styles.headerBlueText}>DELIVERING TO</Text>
                                    <View style={styles.rowContainer}>
                                        <Text style={styles.headerNameText}>{ this.props.auth.address && this.props.auth.address.length ? (this.props.auth.address[this.props.auth.selectedAddress] ? this.props.auth.address[this.props.auth.selectedAddress].split(', ')[1] : this.props.auth.address[0].split(', ')[1]) : '' }</Text>
                                        <Entypo name="chevron-thin-down" size={18} color={"#1A2D5A"} style={styles.headerIcon} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.mainContainer}>
                                {this.state.todaysFeaturedRestaurant.restaurant_name && <React.Fragment>
                                    <TouchableOpacity onPress={() => {
                                        this.initAsyncStorage()
                                        this.props.navigation.navigate("RestaurantDetails",
                                            {
                                               restaurant: this.state.todaysFeaturedRestaurant
                                            })
                                    }}>
                                        <Text style={styles.mainHeaderText}>Today's Featured Restaurant</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.initAsyncStorage()
                                        this.props.navigation.navigate("RestaurantDetails",
                                            {
                                                restaurant: this.state.todaysFeaturedRestaurant
                                            })
                                    }}>
                                        <Image
                                            style={styles.mainImage}
                                            source={{ uri: this.state.todaysFeaturedRestaurant.restaurant_logourl }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.initAsyncStorage()
                                            this.props.navigation.navigate("RestaurantDetails",
                                                {
                                                    restaurant: this.state.todaysFeaturedRestaurant
                                                })
                                        }}>
                                        <Text style={[styles.mainHeaderText, { fontSize: 20, marginTop: 22 }]}>{this.state.todaysFeaturedRestaurant.restaurant_name}</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.mainGreyText}>{this.state.todaysFeaturedRestaurant.restaurant_description}</Text>
                                </React.Fragment>}
                                {!this.state.todaysFeaturedRestaurant.restaurant_name && <View>
                                    <Text style={styles.mainHeaderText}>Today's Featured Restaurant</Text>
                                    <View style={{...styles.modalMainContainer}}>
                                        <View style={styles.modalInnerContainer}>
                                            <Text style={styles.text}>{"Oops!"}</Text>
                                            <Text style={styles.secondaryText}>{"Sorry for the inconvenience but our drivers are unable to complete any orders today. Please check back in tomorrow!"}</Text>
                                        </View>
                                    </View>    
                                </View>}
                                <Text style={[styles.mainHeaderText, { fontSize: 16, marginVertical: 13, }]}>Upcoming restaurants</Text>
                                <FlatList
                                    horizontal={true}
                                    data={this.state.vendorList}
                                    renderItem={this.renderItem}
                                    keyExtractor={(item) => { return item.vendorID }}
                                />
                            </View>
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
                {this.state.showPicker && <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.showPicker}>
                    <TouchableOpacity style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0,0,0,0.5)"
                    }}
                        onPress={()=>{this.setState({showPicker: false})}}
                    >
                    <ScrollView style={{
                        width: "80%",
                        borderRadius: 8,
                        backgroundColor: "white",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        maxHeight: '60%',
                        shadowOpacity: 0.34,
                        shadowRadius: 6.27,
                        elevation: 10,
                        paddingBottom: 25}}>
                        <Text style={{textAlign: 'center', paddingVertical: 15, marginHorizontal: 10, ...styles.headerNameText}}>Pick an Address</Text>
                        {this.props.auth.address && this.props.auth.address.length && this.props.auth.address.map((item, index)=>{
                            return <TouchableOpacity 
                            style={{alignItems: 'center', paddingVertical: 10, borderBottomColor: '#ccc', borderBottomWidth: 1, marginHorizontal: 10}} 
                            onPress={()=>{this.setState({showPicker: false}); this.props.setAddress(index)}}>
                                <Text style={{textAlign: 'center', ...styles.headerNameText}}>{item}</Text>
                            </TouchableOpacity>
                        })

                        }
                    </ScrollView>
                </TouchableOpacity>
            </Modal>}
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps, {initUser, setAddress})(Home);