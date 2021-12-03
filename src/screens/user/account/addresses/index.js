import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import BackButton from '../../../../components/backButton';
import Header from '../../../../components/headerText';
import Button from '../../../../components/button';
import AuthService from '../../../../services/AuthServices';
import { connect } from 'react-redux';
import { add } from 'react-native-reanimated';

class Addresses extends React.Component {
    authSercvice = new AuthService()
    constructor(props){
        super(props)

        this.state = {
            addresses: [],
            reload: false,
        }
    }

    componentDidMount(){
        this._unsuscribe = this.props.navigation.addListener('focus', () => {
            this.getAddresses();
        })

    }

    getAddresses = () => {
        this.setState({ loading: true }, async () => {
            let uidFormData = new FormData();
            uidFormData.append('userID', this.props.auth.userID);

            this.authSercvice.getUserDetails(uidFormData, async (response)=>{
               this.setState({
                   addresses: response.response.userinfo.address.split(' & ')
               })
               this.setState({reload: false})
            })
        })
    }

    deleteAddress = (index) => {
        console.log('BORRAR', index)
        const addresses = [...this.state.addresses]
        addresses.splice(index, 1)
        console.log(addresses)
        let address = ''
        addresses.forEach(add=>{
            address = addresses.join(' & ')
        })
        console.log(address)
        let formData = new FormData();
        formData.append('userID', this.props.auth.userID);
        formData.append('address', address);
        console.log('ESTE ES EL DEBUG FINAL', address)
        const headers = {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
        };
        this.authSercvice.update(formData, async (res) => {
            console.log(res)
            this.setState({ showModal: true })
            setTimeout(() => {
                this.setState({ loading: false }, () => {
                    this.getAddresses();
                })
            },
                2000
            )
        });
    }

    componentWillUnmount(){
        this._unsuscribe();
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.container}>
                    <ScrollView 
                    refreshControl = {
                        <RefreshControl
                            colors={["red", "green", "blue"]}
                            tintColor = 'blue'
                            refreshing = {this.state.reload}
                            onRefresh = {() => {
                                this.setState({reload: true})
                                this.getAddresses();
                            }}
                         />}   
                    
                    style={styles.scrollViewContainer}>
                        <View style={styles.container}>
                            <BackButton navigation={this.props.navigation} />
                            <Header title="Account Address" />
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("AddAddresses")}
                                style={styles.rowContainer}>
                                <Ionicons name="add-circle" size={30} color={"#1A2D5A"} />
                                <Text style={styles.boldText}>Add address</Text>
                            </TouchableOpacity>
                            <Text style={styles.text}>Saved Address</Text>
                            {this.state.addresses.map((address, index)=>{
                                if(address !== '')
                                return <View style={[styles.row, { justifyContent: "space-between" }]}>
                                <View style={[styles.row, { marginTop: 0, flex: 1, alignItems: 'flex-start' }]}>
                                    <View style={styles.circle} />
                                    <Text style={{ marginLeft: 12, color: "#1A2D5A", flex: 1 }}>{address}</Text>
                                </View>
                                <TouchableOpacity onPress={()=>{this.deleteAddress(index)}} style={{ padding: 5 }}>
                                    <MaterialIcons name="delete" size={17} color={"#1A2D5A"} /> 
                                </TouchableOpacity>
                            </View>
                            })

                            }

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(Addresses)