import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';

import BackButton from '../../../../components/backButton';
import Header from '../../../../components/headerText';
import Button from '../../../../components/button';
import CartNotify from '../../../../components/cartNotify';

import AsyncStorage from '@react-native-community/async-storage'
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { setAddress } from '../../../../redux/actions';

class ShoppingCart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            itemList: [],
            showTimePicker: false,
            time: new Date("2020-08-14T09:47:10.842Z"),
            totalPrice: '',
            showModal: false,
            showModal1: false,
            cartItems: this.props.cart.cartItems,
            displayedTime: '',
            click_timeFlg: false,
            order_startTime: '',
            order_cutTime: '',
            order_Time: '',
            to_Time1: '',
            to_Time2: '',
            to_Time3: '',
        }
    }

    componentDidMount() {
        this.getItemsFromStorage()
        this.state.order_startTime = this.props.route.params.order_time.split("~")[0]
        this.state.order_cutTime = this.props.route.params.order_time.split("~")[1]
        this.ChangeTime();
    }

    async ChangeTime() {
        let order_startTime;
        let order_cutTime;
        if (this.state.order_startTime.substring(5, 8) == "PM") {
            order_startTime = (parseInt(this.state.order_startTime.substring(0, 2)) + 12) * 60 + parseInt(this.state.order_startTime.substring(3, 5))
            await this.setState({ to_Time1: order_startTime })
        } else {
            order_startTime1 = (parseInt(this.state.order_startTime.substring(0, 2))) * 60 + parseInt(this.state.order_startTime.substring(3, 5))
            await this.setState({ to_Time1: order_startTime })
        }

        if (this.state.order_cutTime.substring(5, 8) == "PM") {
            order_cutTime = (parseInt(this.state.order_cutTime.substring(0, 2)) + 12) * 60 + parseInt(this.state.order_cutTime.substring(3, 5))
            await this.setState({ to_Time2: order_cutTime })
        } else {
            order_cutTime = (parseInt(this.state.order_cutTime.substring(0, 2))) * 60 + parseInt(this.state.order_cutTime.substring(3, 5))
            await this.setState({ to_Time2: order_cutTime })
        }
    }

    getItemsFromStorage = async () => {
        let keys = await AsyncStorage.getAllKeys()
        keys = keys.filter((key) => {
            return key !== 'userName' && key !== 'userPhoneNumber' && key !== 'userID' && key !== 'userPhoto' && key !== 'userEmail'
        })
        console.log(keys, 'ESTAS SON LAS KEYS')
        let savedItemList = await AsyncStorage.multiGet(keys)
        // console.log(savedItemList, 'ESTAS SON LAS KEYS')
        let items = []
        let price = 0
        savedItemList.map((savedItem, index) => {
            let temp = JSON.parse(savedItem[1])
            // console.log(temp, 'TEMP')
            items.push(temp)
            price += parseFloat(temp[0].originPrice)
            temp.map((item, index) => {
                if (index !== 0)
                    price += parseFloat(item.price)
            })
        })
        this.setState({
            itemList: items,
            totalPrice: price.toFixed(2)
        })
    }

    paymentFunc = () => {
        if (this.state.click_timeFlg) {
            if (this.state.to_Time3 > this.state.to_Time1 && this.state.to_Time3 < this.state.to_Time2) {
                this.props.navigation.navigate("Payment", {
                    total: this.state.totalPrice,
                    time: this.state.order_time,
                    location: {
                        coordinates: {
                            latitude: -38.41,
                            longitude: -63.61,
                        },
                        description: 'Some Location'
                    },
                });
            } else {
                this.setState({ showModal1: true })
            }

        } else {
            this.setState({ showModal1: true })
        }
    }

    parseTime = async () => {
        let picker_Time;
        let to_minuts;

        let zone;
        let hours = this.state.time.getHours();
        let minutes = this.state.time.getMinutes();

        if (this.state.time.getHours() > 11) {
            zone = "PM";
            hours = hours - 12
        }
        else
            zone = "AM";
        if (hours === 0) {
            hours = 12
        }
        // return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes} ${zone}`;
        picker_Time = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes} ${zone}`;
        await this.setState({ order_Time: picker_Time })
        if (picker_Time.substring(6, 9) == "PM") {
            to_minuts = (parseInt(picker_Time.substring(0, 2)) + 12) * 60 + parseInt(picker_Time.substring(3, 5))
            // alert("PM")
        } else {
            to_minuts = (parseInt(picker_Time.substring(0, 2))) * 60 + parseInt(picker_Time.substring(3, 5))
            // alert("AM")
        }
        await this.setState({ to_Time3: to_minuts })
        setTimeout(() => { if (this.state.to_Time3 < this.state.to_Time1 || this.state.to_Time3 > this.state.to_Time2) { this.setState({ showModal: true }) } }, 1000);

    }

    rendorItem = ({ item, index }) => {
        // console.log(item, "DEBUG: item")
        let price = parseFloat(item[0].originPrice)
        let tempArray = []
        item.map((value, index) => {
            if (index > 0) {
                // console.log(value, index, 'DEBUG')
                price += parseFloat(value.price)
                // console.log('DEBUG INCLUDES: ', value.modifierName, !tempArray.includes(value.modifierName), tempArray)
                if (!tempArray.includes(value.modifierName)) {
                    tempArray.push(value.modifierName)
                }
            }
        })
        return (
            <View>
                <View style={styles.rowContainerModifier}>
                    <Text style={styles.blackText}>{item[0].itemName}</Text>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={styles.greyText}>................</Text>
                    </View>
                    <Text style={styles.blackText}>${price.toFixed(2)}</Text>
                </View>
                {
                    tempArray.map((value, index) => {

                        return <Text style={styles.greyText}>{value}</Text>
                    })
                }
            </View>
        )
    }

    handleDatePicker = async (time) => {
        await this.setState({ time: time, showTimePicker: false })
        this.parseTime();
    }

    render() {
        // const { order_time , otherParam} = route.params;
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                        <View style={styles.container}>
                            <View style={styles.headerContainer}>
                                <BackButton navigation={this.props.navigation} search={this.props.route.params && this.props.route.params.search} />
                                <TouchableOpacity onPress={() => { this.setState({ showPicker: true }) }} style={styles.headerRightContainer}>
                                    <Text style={{ ...styles.headerBlueText, textAlign: 'right' }}>DELIVERING TO</Text>
                                    <View style={styles.rowContainer}>
                                        <Text style={styles.headerNameText}>{this.props.auth.address && this.props.auth.address.length ? (this.props.auth.address[this.props.auth.selectedAddress] ? this.props.auth.address[this.props.auth.selectedAddress].split(', ')[1] : this.props.auth.address[0].split(', ')[1]) : ''}</Text>
                                        <Entypo name="chevron-thin-down" size={18} color={"#1A2D5A"} style={styles.headerIcon} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Header title="Items" />
                            <FlatList
                                data={this.state.itemList}
                                renderItem={this.rendorItem}
                                keyExtractor={item => item.id}
                            />
                            <Text style={[styles.blackText, { fontSize: 16, marginTop: 32 }]}>Delivery Time</Text>

                            <TouchableOpacity
                                onPress={() => this.setState({ showTimePicker: true, click_timeFlg: true })}
                                style={styles.deliveryTimeContainer}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    {/* <Text style={styles.deliveryTimeBlack}>{this.parseTime()}</Text> */}
                                    {this.state.to_Time3 > this.state.to_Time1 && this.state.to_Time3 < this.state.to_Time2 ?
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            < Text style={styles.deliveryTimeBlack}>{this.state.click_timeFlg ? this.state.order_Time : this.state.order_startTime}</Text>
                                            <Text style={styles.greyTime}>({this.state.order_cutTime} order cut off)</Text>
                                        </View> :
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            < Text style={styles.deliveryTimeBlack}>{this.state.order_startTime}</Text>
                                            <Text style={styles.greyTime}>({this.state.order_cutTime} order cut off)</Text>
                                        </View>
                                    }
                                </View>

                                <Entypo name="chevron-thin-down" size={20} color={"#333333"} />
                            </TouchableOpacity>

                            <DateTimePickerModal
                                date={this.state.time}
                                isVisible={this.state.showTimePicker}
                                mode="time"
                                // onConfirm={time => {
                                //     this.setState({ time: time, showTimePicker: false })
                                // }}
                                onConfirm={this.handleDatePicker}
                                onCancel={() => this.setState({ showTimePicker: false })}
                            />

                            <Text style={[styles.blackText, { fontSize: 16, marginTop: 32 }]}>Total</Text>
                            <View style={{ marginBottom: 35 }}>
                                <View style={styles.rowContainerModifier}>
                                    <Text style={styles.greyText}>Promo Code:</Text>
                                    <View style={{ flex: 1, alignItems: "center" }}>
                                        <Text style={styles.greyText}>................</Text>
                                    </View>
                                    <Text style={styles.blackText}>Promo Code</Text>
                                </View>
                                <View style={styles.rowContainerModifier}>
                                    <Text style={styles.greyText}>Sub Total:</Text>
                                    <View style={{ flex: 1, alignItems: "center" }}>
                                        <Text style={styles.greyText}>................</Text>
                                    </View>
                                    <Text style={styles.blackText}>$0.00</Text>
                                </View>
                                <View style={styles.rowContainerModifier}>
                                    <Text style={styles.greyText}>Taxes:</Text>
                                    <View style={{ flex: 1, alignItems: "center" }}>
                                        <Text style={styles.greyText}>................</Text>
                                    </View>
                                    <Text style={styles.blackText}>$0.00</Text>
                                </View>
                                <View style={styles.rowContainerModifier}>
                                    <Text style={styles.greyText}>Delivery:</Text>
                                    <View style={{ flex: 1, alignItems: "center" }}>
                                        <Text style={styles.greyText}>................</Text>
                                    </View>
                                    <Text style={styles.blackText}>$0.00</Text>
                                </View>
                            </View>
                            <Button blue={true} title={"CONTINUE $" + this.state.totalPrice} func={this.paymentFunc} />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <Modal
                    onRequestClose={() => {
                        this.setState({ showModal: false });
                    }}
                    // animationType="fade"
                    transparent={true}
                    visible={this.state.showModal}>
                    <View style={{ ...styles.modalMainContainer }}>
                        <View style={styles.modalInnerContainer}>
                            <Text style={styles.text}>{"Oops!"}</Text>
                            <Text style={styles.secondaryText}>1. Order time should be earlier than {this.state.order_cutTime}</Text>
                            <Text style={styles.secondaryText}>2. Order time should be later than {this.state.order_startTime}</Text>
                            <View style={{ width: '60%' }}>
                                <Button blue title="OK" func={() => { this.setState({ showModal: false }); }} />
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    onRequestClose={() => {
                        this.setState({ showModal1: false });
                    }}
                    // animationType="fade"
                    transparent={true}
                    visible={this.state.showModal1}>
                    <View style={{ ...styles.modalMainContainer }}>
                        <View style={styles.modalInnerContainer}>
                            <Text style={styles.text}>{"Oops!"}</Text>
                            <Text style={styles.secondaryText}>Please select order time</Text>
                            <View style={{ width: '60%' }}>
                                <Button blue title="OK" func={() => { this.setState({ showModal1: false }); }} />
                            </View>
                        </View>
                    </View>
                </Modal>
                {
                    this.state.showPicker && <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.showPicker}>
                        <TouchableOpacity style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(0,0,0,0.5)"
                        }}
                            onPress={() => { this.setState({ showPicker: false }) }}
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
                                paddingBottom: 25
                            }}>
                                <Text style={{ textAlign: 'center', paddingVertical: 15, marginHorizontal: 10, ...styles.headerNameText }}>Pick an Address</Text>
                                {this.props.auth.address && this.props.auth.address.length && this.props.auth.address.map((item, index) => {
                                    return <TouchableOpacity
                                        style={{ alignItems: 'center', paddingVertical: 10, borderBottomColor: '#ccc', borderBottomWidth: 1, marginHorizontal: 10 }}
                                        onPress={() => { this.setState({ showPicker: false }); this.props.setAddress(index) }}>
                                        <Text style={{ textAlign: 'center', ...styles.headerNameText }}>{item}</Text>
                                    </TouchableOpacity>
                                })

                                }
                            </ScrollView>
                        </TouchableOpacity>
                    </Modal>
                }
            </SafeAreaView >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        cart: state.cart
    };
}
export default connect(mapStateToProps, { setAddress })(ShoppingCart)