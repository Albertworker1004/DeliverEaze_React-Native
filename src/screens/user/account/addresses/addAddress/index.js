import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

import BackButton from '../../../../../components/backButton';
import Header from '../../../../../components/headerText';
import Button from '../../../../../components/button';
import InputField from '../../../../../components/textInput';
import AuthService from '../../../../../services/AuthServices';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';

class AddAddress extends React.Component {
    authSercvice = new AuthService()
    constructor(props){
        super(props);

        this.state= {
            address: '',
            city: '',
            state: '',
            zip: '',
            loading: false
        }
    }

    continueFunc = () => {
        // this.props.navigation.goBack();
        this.setState({addAddressPressed: true})
        if(this.state.address.length === 0 || this.state.city.length === 0 || this.state.state.length === 0 || this.state.zip.length === 0)
            return
        this.setState({ loading: true }, async () => {
            console.log(`${this.state.address}, ${this.state.city}, ${this.state.state} ${this.state.zip}`)
            console.log(`${this.props.auth.userID}`)
            let uidFormData = new FormData();
            uidFormData.append('userID', this.props.auth.userID);

            this.authSercvice.getUserDetails(uidFormData, async (response)=>{
                let formData = new FormData();
                formData.append('userID', this.props.auth.userID);
                formData.append('address', `${response.response.userinfo.address !== '' ? `${response.response.userinfo.address} & ` : ''}${this.state.address}, ${this.state.city}, ${this.state.state} ${this.state.zip}`);
                console.log('ESTE ES EL DEBUG FINAL', `${response.response.userinfo.address ? `${response.response.userinfo.address} & ` : ''}${this.state.address}, ${this.state.city}, ${this.state.state} ${this.state.zip}`)
                const headers = {
                    'Content-Type': 'multipart/form-data',
                    Accept: 'application/json',
                };
                this.authSercvice.update(formData, async (res) => {
                    console.log(res)
                    this.setState({ showModal: true })
                    setTimeout(() => {
                        this.setState({ loading: false }, () => {
                            this.props.navigation.goBack();
                        })
                    },
                        2000
                    )
                });
            })
        });

    }

    getFieldsForAutoComplete = (data) => {
        console.log(data)
        data.map(item => {
            console.log(item)
            if(item.types.includes('locality')){
                this.setState({city : item.long_name})
            }
            if(item.types.includes('administrative_area_level_1')){
                this.setState({state : item.long_name})
            }
            if(item.types.includes('postal_code')){
                this.setState({zip : item.long_name})
            }
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.container}>
                    <ScrollView keyboardShouldPersistTaps={'always'} contentContainerStyle={styles.scrollViewContainer}>
                        <View style={styles.container}>
                            <View style={{ flex: 1, marginBottom: 20 }}>
                                <BackButton navigation={this.props.navigation} />
                                <Header title="Address" />
                                <View style={styles.inputContainer}>
                                    <GooglePlacesAutocomplete 
                                            placeholder = 'Address'
                                            fetchDetails = {true}
                                            styles = {{
                                                textInputContainer : {
                                                    backgroundColor : 'white',
                                                    borderTopWidth : 0,
                                                    borderBottomWidth : 0
                                                }
                                            }}
                                            onPress = {(data, details) => {
                                                console.log('HOLA')
                                                this.setState({address : data.description.split(',')[0]})
                                                const {address_components} = details
                                                if(address_components.length === 0)
                                                {
                                                    return
                                                }
                                                this.getFieldsForAutoComplete(address_components)
                                            }}
                                            query = {{
                                                key : 'AIzaSyCbKjAEKyhGhDu_g1-EzhbstJb9taqx88c',
                                                language : 'en',
                                                types : ['cities', 'geocode', 'addresses']
                                            }}
                                        />
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={[styles.inputContainer, { flex: 1, marginRight: 16 }]}>
                                        <InputField
                                        input={this.state.city}
                                        state="city"
                                        update={true}
                                        updateFunc={(state, change)=>{
                                            this.setState({city: change})
                                        }}
                                        errorMessage={this.state.addAddressPressed && this.state.city.length === 0 ? 'CARD_NAME_ERROR' : null}
                                        placeholder="City" />
                                    </View>
                                    <View style={[styles.inputContainer, { flex: 1, marginRight: 16 }]}>
                                        <InputField
                                        input={this.state.state}
                                        state="state"
                                        update={true}
                                        updateFunc={(state, change)=>{
                                            this.setState({state: change})
                                        }}
                                        errorMessage={this.state.addAddressPressed && this.state.state.length === 0 ? 'CARD_NAME_ERROR' : null}
                                        placeholder="State" />
                                    </View>
                                    <View style={[styles.inputContainer, { flex: 1 }]}>
                                        <InputField
                                        input={this.state.zip}
                                        state="zip"
                                        update={true}
                                        updateFunc={(state, change)=>{
                                            this.setState({zip: change})
                                        }}
                                        errorMessage={this.state.addAddressPressed && this.state.zip.length === 0 ? 'CARD_NAME_ERROR' : null}
                                        placeholder="ZIP" max={5} />
                                    </View>
                                </View>
                            </View>

                            <Button loading={this.state.loading} blue={true} title="CONTINUE" func={this.continueFunc} />
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

export default connect(mapStateToProps)(AddAddress)