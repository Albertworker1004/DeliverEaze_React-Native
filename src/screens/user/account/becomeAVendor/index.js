import React from 'react';
import { View, TextInput, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, Text } from 'react-native';

import styles from './styles';

import { connect } from 'react-redux';
import BackButton from '../../../../components/backButton';
import Header from '../../../../components/headerText';
import Button from '../../../../components/button';
import InputField from '../../../../components/textInput';
import AuthService from '../../../../services/AuthServices';
import { NAME_ERROR, PHONE_ERROR, ADDRESS_ERROR, CITY_ERROR, STATE_ERROR, ZIP_ERROR, NUMBER_OF_LOCATIONS_ERROR } from '../../../../config/errorMessages';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import WelcomeModal from '../../../../components/welcomeHomeModal';


class BecomeAVendor extends React.Component {

    authService = new AuthService();

    constructor(props) {
        super(props);

        console.log(props)

        this.state = {
            loading: false,
            showModal : false,
            restaurant_name : this.props.auth.restaurant_name == undefined ? "" : this.props.auth.restaurant_name,
            restaurant_address : this.props.auth.restaurant_address == undefined ? "" : this.props.auth.restaurant_address,
            number_of_locations : this.props.auth.number_of_locations == undefined ? "" : this.props.auth.number_of_locations,
            restaurant_phone : this.props.auth.restaurant_phone == undefined ? "" : this.props.auth.restaurant_phone,
            city : '',
            state : '',
            zip : '',
            submitPressed : false
        }
    }

    submitFunc = () => {
        this.setState({submitPressed : true})
        this.become_Vendor()
    }

    componentDidMount() {
    }

    updateState = (key, value) => {
        this.setState({
            [key]: value,
        });
    };

    become_Vendor = () => {
        if(this.props.auth.restaurant_name.length > 0 &&
            this.props.auth.restaurant_phone.length > 0 &&
            this.state.restaurant_address.length > 0 )
        {
            
            let formdata = new FormData();
            formdata.append('userID', this.props.auth.userID);
            formdata.append('restaurant_name', this.props.auth.restaurant_name);
            formdata.append('restaurant_address', this.state.restaurant_address);
            formdata.append('number_of_locations', this.props.auth.number_of_locations);
            formdata.append('restaurant_phone', this.props.auth.restaurant_phone);
            formdata.append('action_time', new Date().toString())

            this.authService.becomeVendor(formdata, async (res) => {
                this.setState({ showModal: true })
                setTimeout(() => {
                    this.setState({ loading: false }, () => {
                        this.props.route.params.refresh()
                        this.props.navigation.goBack();
                    })
                },
                    2000
                )
            });
        }
    };

    getFieldsForAutoComplete = (data) => {
        data.map(item => {
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
                    keyboardShouldPersistTaps = {'always'}
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.container}>
                    <ScrollView keyboardShouldPersistTaps = {'always'} contentContainerStyle={styles.scrollViewContainer}>
                        <View style={styles.container}>
                            {this.state.showModal &&
                                <WelcomeModal text1='Thank you for sharing your interest in becoming a vendor.' text2="" />
                            }
                            <View style={{ flex: 1, marginBottom: 20 }}>
                                <BackButton navigation={this.props.navigation} />
                                <Header title="Become A Vendor" />

                                <View style={styles.inputContainer}>
                                    <InputField
                                        updateFunc={this.updateState}
                                        placeholder="Restaurant Name"
                                        InputField={this.props.auth.restaurant_name}
                                        state="restaurant_name"
                                        errorMessage={this.state.submitPressed && this.props.auth.restaurant_name.length == 0 ? NAME_ERROR : null} />
                                </View>
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
                                                this.setState({restaurant_address : data.description})
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
                                    <View style={[styles.inputContainer, { flex: 1, paddingLeft : 10, marginRight: 16, padding : 10, backgroundColor : 'white'}]}>
                                        <Text style = {{color : '#B8B6B6', fontSize : 10, marginBottom : 15}}>
                                            City
                                        </Text>
                                        <TextInput 
                                            placeholder = 'City'
                                            value = {this.state.city}
                                            onChange = {(value) => {
                                                this.setState({city : value})
                                            }}
                                        />
                                    </View>
                                    <View style={[styles.inputContainer, { flex: 1, marginRight: 16, padding : 10, backgroundColor : 'white' }]}>
                                        <Text style = {{color : '#B8B6B6', fontSize : 10, marginBottom : 15}}>
                                            State
                                        </Text>
                                        <TextInput 
                                            placeholder = 'State'
                                            value = {this.state.state}
                                            onChange = {(value) => {
                                                this.setState({state : value})
                                            }}
                                        />
                                    </View>
                                    <View style={[styles.inputContainer, { flex: 1, padding : 10, backgroundColor : 'white' }]}>
                                        <Text style = {{color : '#B8B6B6', fontSize : 10, marginBottom : 15, }}>
                                            Zip
                                        </Text>
                                        <TextInput 
                                            placeholder = 'Zip'
                                            maxLength = {5}
                                            value = {this.state.zip}
                                            onChange = {(value) => {
                                                this.setState({zip : value})
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={[styles.inputContainer, { flex: 1, marginRight: 16 }]}>
                                        <InputField 
                                            placeholder="Phone"
                                            type="number-pad"
                                            InputField={this.props.auth.restaurant_phone}
                                            state="restaurant_phone"
                                            errorMessage={this.state.submitPressed && this.props.auth.restaurant_phone.length == 0 ? PHONE_ERROR : null} />
                                    </View>
                                    <View style={[styles.inputContainer, { flex: 1 }]}>
                                        <InputField
                                            placeholder="Number of Locations"
                                            type="number-pad"
                                            InputField={this.props.auth.number_of_locations}
                                            state="number_of_locations"
                                            errorMessage={this.state.submitPressed && this.props.auth.number_of_locations === 0 ? NUMBER_OF_LOCATIONS_ERROR : null} />
                                    </View>
                                </View>
                            </View>

                            <Button
                                blue={true}
                                title="SUBMIT"
                                loading={this.state.loading}
                                func={this.submitFunc}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, null)(BecomeAVendor);