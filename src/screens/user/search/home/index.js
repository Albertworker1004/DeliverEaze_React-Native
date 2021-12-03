import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, TextInput, TouchableOpacity, RefreshControl, Modal } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

import styles from './styles';

import Header from '../../../../components/headerText';
import CartNotify from '../../../../components/cartNotify';
import { connect } from 'react-redux';
import AuthService from '../../../../services/AuthServices';
import { setAddress } from '../../../../redux/actions';

class Home extends React.Component {

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

    //#596e85 Today's color
    componentDidMount(){
        this.getVendorList();
    }

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
                    <ScrollView 
                        refreshControl={
                            <RefreshControl
                                colors={["red", "green", "blue"]}
                                tintColor='blue'
                                refreshing={this.state.reload}
                                onRefresh={() => {
                                    this.setState({reload: true})
                                    this.getVendorList();
                                }}
                            />
                            }
                    >
                        <View style={styles.container}>
                            
                            <View style={styles.headerContainer}>
                                <Text style={styles.headerNameText}>{this.props.auth.name}</Text>
                                <TouchableOpacity onPress={()=>{this.setState({showPicker: true})}} style={styles.headerRightContainer}>
                                    <Text style={{...styles.headerBlueText, textAlign: 'right'}}>DELIVERING TO</Text>
                                    <View style={styles.rowContainer}>
                                        <Text style={styles.headerNameText}>{ this.props.auth.address && this.props.auth.address.length ? (this.props.auth.address[this.props.auth.selectedAddress] ? this.props.auth.address[this.props.auth.selectedAddress].split(', ')[1] : this.props.auth.address[0].split(', ')[1]) : '' }</Text>
                                        <Entypo name="chevron-thin-down" size={18} color={"#1A2D5A"} style={styles.headerIcon} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.mainContainer}>
                                <Header title="Search" />
                                <View style={styles.searchContainer}>
                                    <Feather name="search" size={18} color={"rgba(0,0,0,0.36)"} />
                                    <TextInput
                                        value={this.state.search}
                                        style={styles.searchInputField}
                                        onChangeText={search => {
                                            let restaurants = this.state.restaurants.filter((rest)=>{
                                                return rest.restaurant_name.toLowerCase().includes(search.toLowerCase())
                                            })
                                            this.setState({filteredRestaurants: restaurants, search})
                                
                                        }
                                        } />
                                </View>
                                {false && <ScrollView style={{ marginTop: 14 }} horizontal={true}>
                                    <TouchableOpacity
                                        style={styles.button}>
                                        <Text style={styles.buttonText}>Name</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText}>Category</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText}>Rating</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText}>Price</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText}>Something</Text>
                                    </TouchableOpacity>
                                </ScrollView>}
                                {this.state.filteredRestaurants.map((rest, index)=>{
                                    if(index === 0){
                                        return <React.Fragment>
                                            <Text style={styles.blueText}>{rest.restaurant_name[0]}</Text>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Restaurant", {
                                                restaurant: rest
                                            })}>
                                            <Text style={styles.boldText}>{rest.restaurant_name}</Text>
                                            </TouchableOpacity>                                      
                                        </React.Fragment>
                                    }else {
                                        return <React.Fragment>
                                            {rest.restaurant_name[0] !== this.state.filteredRestaurants[index-1].restaurant_name[0] && <Text style={styles.blueText}>{rest.restaurant_name[0]}</Text>}
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Restaurant", {
                                                restaurant: rest
                                            })}>
                                            <Text style={styles.boldText}>{rest.restaurant_name}</Text>
                                            </TouchableOpacity>
                                        </React.Fragment>
                                    }
                                })

                                }
                                
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

const mapStateToProps = (state) =>{
    return {
        auth: state.auth,
    }
}


export default connect(mapStateToProps, {setAddress})(Home)