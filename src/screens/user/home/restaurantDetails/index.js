import React from 'react';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Image, TouchableOpacity, FlatList, RefreshControl, Modal, Linking } from 'react-native';

import BackButton from '../../../../components/backButton';
import Header from '../../../../components/headerText';
import Button from '../../../../components/button';
import CartNotify from '../../../../components/cartNotify';
import AuthService from '../../../../services/AuthServices';

import styles from './styles';
import WelcomeHomeModal from '../../../../components/welcomeHomeModal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { initUser, setAddress } from '../../../../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';



class ConfirmCode extends React.Component {

    authService = new AuthService();

    constructor(props) {
        super(props);
        let days = [
            this.props.route.params.restaurant.hours_sunday,
            this.props.route.params.restaurant.hours_monday,
            this.props.route.params.restaurant.hours_tuesday,
            this.props.route.params.restaurant.hours_wednesday,
            this.props.route.params.restaurant.hours_thursday,
            this.props.route.params.restaurant.hours_friday,
            this.props.route.params.restaurant.hours_saturday,
        ]
        let now = new Date();
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        let date = new Date(this.props.route.params.restaurant.featured_date);
        let hours = []
        let hoursString = days[today.getDay()].split(',');
        hoursString.forEach((str, index)=>{
            // console.log('DEBUG 1', str)
            let open = str.split('-')[0]
            let close = str.split('-')[1]
            if(open && close){
                // console.log('DEBUG', open.split(':')[1].substr(2,2).toUpperCase() === 'AM' ? (parseInt(open.split(':')[0]) < 12 ? parseInt(open.split(':')[0]) : 0) : parseInt(open.split(':')[0]) + 12, parseInt(open.split(':')[1].substr(0,2)), close.split(':')[1].substr(2,2).toUpperCase() === 'AM' ? (parseInt(close.split(':')[0]) < 12 ? parseInt(close.split(':')[0]) : 0) : parseInt(close.split(':')[0]) + 12, parseInt(close.split(':')[1].substr(0,2)))
                let openDate = new Date(
                    today.getFullYear(), 
                    today.getMonth(), 
                    today.getDate(), 
                    open.split(':')[1].substr(2,2).toUpperCase() === 'AM' ? (parseInt(open.split(':')[0]) < 12 ? parseInt(open.split(':')[0]) : 0) : parseInt(open.split(':')[0]) + 12, 
                    parseInt(open.split(':')[1].substr(0,2))
                    , 0, 0)
                let closeDate = new Date(
                    today.getFullYear(), 
                    today.getMonth(), 
                    today.getDate(), 
                    close.split(':')[1].substr(2,2).toUpperCase() === 'AM' ? (parseInt(close.split(':')[0]) < 12 ? parseInt(close.split(':')[0]) : 0) : parseInt(close.split(':')[0]) + 12, 
                    parseInt(close.split(':')[1].substr(0,2))
                    , 0, 0)
                // console.log(openDate.getHours(), closeDate.getHours())
                hours.push({
                    open: openDate,
                    close: closeDate,
                })
            }

        })
        let open = false
        hours.forEach((hr)=>{
            if(now.getTime() < hr.close.getTime() && now.getTime() > hr.open.getTime())
            open = true;
        })
        // console.log('Its open', open)
        this.state = {
            reload : false,
            userID : this.props.route.params.restaurant.userID,
            itemList : [],
            logo : this.props.route.params.restaurant.restaurant_logourl,
            description : this.props.route.params.restaurant.restaurant_description,
            title : this.props.route.params.restaurant.restaurant_name,
            modifierList : [],
            totalPrice : 0,
            priceList : [],
            showModal: this.props.route.params.restaurant.userID ? false : true,
            available: date.getTime() === today.getTime(),
            address: this.props.route.params.restaurant.restaurant_address,
            phone: this.props.route.params.restaurant.restaurant_phone,
            today: days[today.getDay()],
            open: open,
            website: this.props.route.params.restaurant.restaurant_website,
            orderTime: ''
        }
    }

    componentDidMount() {
        if(this.state.userID){
            this.getVendorDetails();
        }
        this.getVendorList();
        // this.getUserData()
    }

    // getUserData = () => {
    //     this.setState({reload: true})
    //     console.log('calling')
    //     let formdata = new FormData();
    //     formdata.append('userID', AsyncStorage.getItem('userID'));
    //     this.authService.getUserDetails(formdata, async (res) => {
    //         console.log(res.response.userinfo)
    //         const user = {
    //             userID: res.response.userinfo.userID,
    //             name: res.response.userinfo.fullname,
    //             email: res.response.userinfo.email,
    //             phoneNumber: res.response.userinfo.phonenumber,
    //             userPhoto: res.response.userinfo.photourl,
    //             address: res.response.userinfo.address.split(' & '),
    //             paymentMethods: res.response.paymentmethodslist
    //         };
    //         console.log(user, 'PREUBA')
    //         await this.props.initUser(user);
    //     });
    //     this.setState({reload: false})
    // };

    getVendorList = () => {
        let formData = new FormData();
        formData.append('userID', this.props.auth.userID);
        this.authService.getVendorList(formData, async (res) => {
            if (res.response.vendorlist) {
                if (res.response.vendorlist.length > 0) {
                    let data = res.response.vendorlist
                    this.setState({orderTime: data[0]['order_time']})
                    let restaurants = []
                    data.forEach((vendor, index)=>{
                        restaurants.push(vendor);
                    })
                    // console.log(restaurants)
                    // console.log("RESTAURANTS")
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

    getVendorDetails = () => {
        let formData = new FormData();
        formData.append('userID', this.state.userID);

        this.authService.getVendorDetails(formData, async (res) => {
            // console.log(res.response.vendorinfo, 'VENDOR DETAILS')
            this.setState({
                itemList : res.response.itemlist,
                modifierList : res.response.modifierlist
            })
        });
    }

    notifyMeFunc = () => {
        this.props.navigation.navigate("NotifyMe");
    }

    handleClickNotify = () => {
        this.props.navigation.navigate("ShoppingCart", {
            items : this.state.itemList,
            modifier : this.state.modifierList,
            order_time: this.state.orderTime
        })
    }

    caculateTotalPrice = (id, value) => {
        let tempArray = this.state.priceList
        let priceItem = {id : id, price : value}
        let data = tempArray.filter(filter => filter.id == id)
        let index = tempArray.indexOf(data[0])
        let price = 0
        if(data.length == 0){
            tempArray.push({id : id, price : value})
        }
        else{
            tempArray[index] = priceItem
        }
        tempArray.map(item => {
            price += item.price
        })
        this.setState({
            totalPrice : price,
            priceList : tempArray
        })
    }

    renderItem = ({item, index}) => {

        return(
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate("RestaurantItem", 
                    {
                        id : item.itemID,
                        userID : item.userID,
                        name : item.item_name,
                        description : item.item_description,
                        price : item.item_price,
                        photo : item.item_photourl,
                        selectedModifierList : item.modifierlist,
                        modifierList : this.state.modifierList,
                        restaurantName: this.state.title,
                        caculate : this.caculateTotalPrice,
                        available: this.state.available
                    }
                )}}
                style={[styles.itemContainer]}>
                <Text style={styles.item}>{item.item_name}</Text>
                <Text style={styles.item}>${item.item_price}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.container}>
                    <ScrollView 
                        contentContainerStyle={styles.scrollViewContainer}
                        refreshControl = {
                            <RefreshControl
                                colors={["red", "green", "blue"]}
                                tintColor = 'blue'
                                refreshing = {this.state.reload}
                                onRefresh = {() => {
                                    this.getVendorDetails()
                                }}
                            />   
                        }
                    >
                        <View style={styles.container}>
                            <View style={styles.headerContainer}>
                                <BackButton navigation={this.props.navigation} search={this.props.route.params && this.props.route.params.search} />
                                <TouchableOpacity onPress={()=>{this.setState({showPicker: true})}} style={styles.headerRightContainer}>
                                    <Text style={{...styles.headerBlueText, textAlign: 'right'}}>DELIVERING TO</Text>
                                    <View style={styles.rowContainer}>
                                        <Text style={styles.headerNameText}>{ this.props.auth.address && this.props.auth.address.length ? (this.props.auth.address[this.props.auth.selectedAddress] ? this.props.auth.address[this.props.auth.selectedAddress].split(', ')[1] : this.props.auth.address[0].split(', ')[1]) : '' }</Text>
                                        <Entypo name="chevron-thin-down" size={18} color={"#1A2D5A"} style={styles.headerIcon} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Header title={this.state.title} />
                            <Image
                                style={styles.mainImage}
                                source={{uri : this.state.logo}} />
                            <Text style={{...styles.mainGreyText, color: '#1A2D5A'}}>{this.state.description}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{marginVertical: 5, backgroundColor: this.state.open ? 'green' : '#c3322d', alignSelf: 'flex-start', paddingHorizontal: 15, borderRadius: 3, paddingVertical: 2}}>
                                    <Text style={{color: 'white', fontSize: 12}}>{this.state.open ? 'OPEN' : 'CLOSED'}</Text>
                                </View>
                                <Text style={{fontSize: 14, flex: 1, marginLeft: 5, color: '#1A2D5A'}}>{this.state.today}</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginVertical: 5, alignItems: 'flex-start'}}>
                                <Ionicons name="location" size={16} color="#1A2D5A" style={{marginRight: 10}} />
                                <Text style={{flex: 1, fontSize: 12, color: '#1A2D5A'}}>{this.state.address}</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginVertical: 5, alignItems: 'center'}}>
                                <Fontisto name="phone" size={14} color="#1A2D5A" style={{marginRight: 10}} />
                                <Text style={{flex: 1, fontSize: 12, color: '#1A2D5A'}}>{this.state.phone}</Text>
                            </View>
                            <TouchableOpacity onPress={()=>{
                                Linking.openURL(this.state.website.includes('http://') ? this.state.website : 'http://'+this.state.website)
                                }} style={{flexDirection: 'row', marginVertical: 5, alignItems: 'center'}}>
                                <MaterialCommunityIcons name="web" size={14} color="#1A2D5A" style={{marginRight: 10}} />
                                <Text style={{flex: 1, fontSize: 12, color: '#1A2D5A', textTransform: 'lowercase'}}>{this.state.website}</Text>
                            </TouchableOpacity>
                            <FlatList
                                data={this.state.itemList}
                                style = {{marginBottom : 80}}
                                renderItem={this.renderItem}
                                keyExtractor={(item) => { item.index }}
                            />
                           
                            <Button blue={true} title="NOTIFY ME" func={this.notifyMeFunc} />
                        </View>
                    </ScrollView>
                    <CartNotify onClick={this.handleClickNotify}/>
                </KeyboardAvoidingView>
                <Modal
                    onRequestClose={()=>{
                        this.props.navigation.goBack();
                    }}
                    animationType="fade"
                    transparent={true}
                    visible={this.state.showModal}>
                    <View style={{...styles.modalMainContainer}}>
                    <View style={styles.modalInnerContainer}>
                        <Text style={styles.text}>{"Oops!"}</Text>
                        <Text style={styles.secondaryText}>{"Sorry for the inconvenience but our drivers are unable to complete any orders at that day. Please check back in other day!"}</Text>
                        <View style={{width: '60%'}}>
                            <Button blue title="OK" func={()=>{this.props.navigation.goBack()}}/>
                        </View>
                    </View>
                </View>
                </Modal>
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

export default connect(mapStateToProps, {initUser, setAddress})(ConfirmCode);