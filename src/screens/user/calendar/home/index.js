import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, RefreshControl, Modal, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';

import Header from '../../../../components/headerText';
import CalendarItem from '../../../../components/calendarItem';
import Button from '../../../../components/button';
import CartNotify from '../../../../components/cartNotify';
import AuthService from '../../../../services/AuthServices';
import { connect } from 'react-redux';
import { setAddress } from '../../../../redux/actions';

class Home extends React.Component {

    authService = new AuthService();

    constructor(props) {
        super(props);

        this.state = {
            days: [],
            restaurants: [],
            reload: false,
            showModal: false,
            orderTime: ''
        }
    }

    notifyMeFunc = () => {
        this.props.navigation.navigate("NotifyMe");
    }

    months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]

    weekDays = [
        'S',
        'M',
        'T',
        'W',
        'T',
        'F',
        'S',
    ]

    setCalendarDays = () => {
        let today = new Date();
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
        let firstDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay(), 0, 0, 0, 0)
        let lastDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 + 7 - today.getDay()), 0, 0, 0, 0)
        console.log(firstDay, lastDay)
        let calendarDays = [];
        for (let i = 0; i < 14; i++) {
            calendarDays.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + i, 0, 0, 0, 0));
        }
        this.setState({ days: calendarDays }, () => {
            this.getVendorList(firstDay, lastDay);
        })
    }

    //#596e85 Today's color
    componentDidMount() {
        this.setCalendarDays();
    }

    getVendorList = (firstDay, lastDay) => {
        let formData = new FormData();
        formData.append('userID', this.props.auth.userID);
        this.authService.getVendorList(formData, async (res) => {
            if (res.response.vendorlist) {
                if (res.response.vendorlist.length > 0) {
                    let data = res.response.vendorlist
                    this.setState({orderTime: data[0]['order_time']})
                    let restaurants = []
                    let today = new Date();
                    today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0)
                    data.forEach((vendor, index) => {
                        let date = new Date(vendor.featured_date);
                        if (date.getTime() >= firstDay.getTime() && date.getTime() <= lastDay.getTime()) {
                            restaurants.push(vendor);
                        }
                    })
                    restaurants = restaurants.sort((a, b) => {
                        const timeA = new Date(a.featured_date)
                        const timeB = new Date(b.featured_date)
                        return timeA.getTime() - timeB.getTime();
                    })
                    this.setState({ restaurants: restaurants })
                }
            }
            this.setState({ reload: false })
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.container}>
                    <ScrollView contentContainerStyle={{ flex: 1 }}
                        refreshControl={
                            <RefreshControl
                                colors={["red", "green", "blue"]}
                                tintColor='blue'
                                refreshing={this.state.reload}
                                onRefresh={() => {
                                    this.setState({ reload: true })
                                    let today = new Date();
                                    today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
                                    let firstDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay(), 0, 0, 0, 0)
                                    let lastDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 + 7 - today.getDay()), 0, 0, 0, 0)
                                    this.getVendorList(firstDay, lastDay)
                                }}
                            />
                        }
                    >
                        <View style={styles.container}>
                            <View style={styles.headerContainer}>
                                <Text style={styles.headerNameText}>{this.props.auth.name}</Text>
                                <TouchableOpacity onPress={() => { this.setState({ showPicker: true }) }} style={styles.headerRightContainer}>
                                    <Text style={{ ...styles.headerBlueText, textAlign: 'right' }}>DELIVERING TO</Text>
                                    <View style={styles.rowContainer}>
                                        <Text style={styles.headerNameText}>{this.props.auth.address && this.props.auth.address.length ? (this.props.auth.address[this.props.auth.selectedAddress] ? this.props.auth.address[this.props.auth.selectedAddress].split(', ')[1] : this.props.auth.address[0].split(', ')[1]) : ''}</Text>
                                        <Entypo name="chevron-thin-down" size={18} color={"#1A2D5A"} style={styles.headerIcon} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.mainContainer}>
                                <View style={{ flex: 1 }}>
                                    <Header title="Calendar" />
                                    <View style={styles.itemRowContainer}>
                                        {this.state.days.slice(0, 7).map((day, index) => {
                                            let today = new Date();
                                            today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
                                            return <CalendarItem
                                                userID={this.props.auth.userID}
                                                navigation={this.props.navigation}
                                                key={index}
                                                today={today.getTime() === day.getTime()}
                                                day={this.weekDays[day.getDay()]}
                                                date={`${this.months[day.getMonth()]} ${day.getDate()}`}
                                                restaurant={this.state.restaurants.find((vendor) => {
                                                    let date = new Date(vendor.featured_date);
                                                    return date.getTime() === day.getTime()
                                                })}
                                                errorFunc={() => {
                                                    this.setState({ showModal: true })
                                                }}
                                            />
                                        })}
                                    </View>
                                    <View style={styles.itemRowContainer}>
                                        {this.state.days.slice(7).map((day, index) => {
                                            return <CalendarItem
                                                userID={this.props.auth.userID}
                                                navigation={this.props.navigation}
                                                key={index}
                                                day={this.weekDays[day.getDay()]}
                                                date={`${this.months[day.getMonth()]} ${day.getDate()}`}
                                                restaurant={this.state.restaurants.find((vendor) => {
                                                    let date = new Date(vendor.featured_date);
                                                    return date.getTime() === day.getTime()
                                                })}
                                                errorFunc={() => {
                                                    this.setState({ showModal: true })
                                                }}
                                            />
                                        })}
                                    </View>

                                </View>
                                <Button blue={true} title="NOTIFY ME" func={this.notifyMeFunc} />
                            </View>
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
                <Modal
                    onRequestClose={() => {
                        this.setState({ showModal: false });
                    }}
                    animationType="fade"
                    transparent={true}
                    visible={this.state.showModal}>
                    <View style={{ ...styles.modalMainContainer }}>
                        <View style={styles.modalInnerContainer}>
                            <Text style={styles.text}>{"Oops!"}</Text>
                            <Text style={styles.secondaryText}>{"Sorry for the inconvenience but our drivers are unable to complete any orders at that day. Please check back in other day!"}</Text>
                            <View style={{ width: '60%' }}>
                                <Button blue title="OK" func={() => { this.setState({ showModal: false }); }} />
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
                </Modal>}
            </SafeAreaView >
        );
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps, { setAddress })(Home)