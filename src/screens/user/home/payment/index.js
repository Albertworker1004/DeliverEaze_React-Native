import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import styles from './styles';

import BackButton from '../../../../components/backButton';
import Header from '../../../../components/headerText';
import Button from '../../../../components/button';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import InputField from '../../../../components/textInput';
import { CARD_NAME_ERROR, CARD_NUMBER_ERROR, CVV_ERROR, EXPIRE_DATE_ERROR, INVALID_CARD_NUMBER, INVALID_CVV_NUMBER } from '../../../../config/errorMessages';

import PaymentService from '../../../../services/PaymentServices';
import AuthService from '../../../../services/AuthServices';
import { initUser } from '../../../../redux/actions';

const PAY_PAL_CLIENT_ID = "AUzLLjbL6PfskIo6zDSQXJbTxwNTpyYlpjXz9J_xOrtIazPdPMZWyIwDIR_bJx-4R0ksz8bTdZY2n5Rp";
const STRIPE_API_KEY = 'pk_test_51HYutJGtIgJo1HpUTNq8lQhCldoTeXQwUrPc0yyQuvSC9CWHCOxhN7dNQDKUKAgZqJRgBNzt95TWjbMwNaTUxBs600Gn78vG6S';

class Payment extends React.Component {
    paymentService = new PaymentService();

    constructor(props) {
        super(props);

        this.state = {
            total: this.props.route.params.total,
            location: this.props.route.params.location,
            time: this.props.route.params.time,
            showModal: false,
            newCard: {
                cardNumber: '',
                cardName: '',
                cvv: '',
                expired_date: ''
            }
        }
    }

    getCreditCardToken = (creditCardData) => {
        
        const card = {
          'card[number]': creditCardData.card_number.replace(/ /g, ''),
          'card[exp_month]': creditCardData.expire_date.split('/')[0],
          'card[exp_year]': creditCardData.expire_date.split('/')[1],
          'card[cvc]': creditCardData.cvv
        };

        return fetch('https://api.stripe.com/v1/tokens', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${STRIPE_API_KEY}`
          },
          method: 'post',
          body: Object.keys(card)
            .map(key => key + '=' + card[key])
            .join('&')
        }).then(response => response.json());
    };

    successFunc = async() => {
        const cardInformation = this.props.auth.paymentMethods.filter((item) => { return item.is_default === 'YES' })[0];
        let creditCardToken = {};
        try{
            creditCardToken = await this.getCreditCardToken(cardInformation);
            if (creditCardToken.error) {
                return;
            }
        }catch(e){
            return;
        }
        
        let paymentInformation = {
            creditCardToken: creditCardToken,
            amount: this.state.total,
            currency: 'usd'
        };
        console.log(paymentInformation);
        this.paymentService.requestPayment(paymentInformation, (res) => {
            if(res.isSuccess){
                console.log('success');
                console.log(res.response);
                this.props.navigation.navigate("Success");
            }else{
                console.log(res.response);
                console.log(res.message);
            }
        });
        
    }

    parseExpireDate = () => {
        if (this.state.newCard.expired_date.length === 2) {
            if (!this.state.line) {
                this.setState({ newCard: { ...this.state.newCard, expired_date: this.state.newCard.expired_date + "/" }, line: true })
            }
        }
    }

    addPayment = () => {
        this.setState({ loading: true, addPaymentPressed: true }, () => {
            if (this.state.newCard.cardName.length > 0 &&
                this.state.newCard.cardNumber.length === 16 &&
                this.state.newCard.cvv.length === 3 &&
                this.state.newCard.expired_date.length === 5
            ) {

                const card = {
                    userID: this.props.auth.userID,
                    expired_date: this.state.newCard.expired_date,
                    cvv: this.state.newCard.cvv,
                    account_name: this.state.newCard.cardName,
                    card_number: this.state.newCard.cardNumber
                }
                console.log("DEBUG", card)
                this.paymentService.addCard(card).then(res => {
                    console.log("Response, cool", res.paymentmethodlist)
                    const user = {
                        paymentMethods: res.paymentmethodlist
                    };
                    this.props.initUser(user)
                }, error => {
                    this.setState({ loading: false, modalText: 'Something went wrong!', showModal: false });
                });

            } else {
                this.setState({ loading: false });
            }
        });
    }

    _onPayYouGo = async () => {
        const options = {
            merchantName: "sss",
            merchantPrivacyPolicyUri: "https://example.com/privacy",
            merchantUserAgreementUri: "https://example.com/useragreement",
        }
        PayPal.initialize(PayPal.NO_NETWORK, PAY_PAL_CLIENT_ID);
        // PayPal.obtainConsent().then(authorization => console.log('User-Authorization', authorization))
        //   .catch(error => console.log('error', error));
        const metadataID = await PayPal.getClientMetadataId();
        PayPal.pay({
            price: '0.1',
            currency: "USD",
            description: "You can process this image after pay 0.1 USD",
        })
            .then((confirm) => {
                console.log('confirm', confirm);
                this.setState({ isPaid: true })
                Alert.alert("Congratulation !", " 0.1 USD was paid. You can process image now");
                // this.paymentHandler(confirm.response, subscription_id, days, userID);
            })
            .catch((error) => {
                if (error.message !== "User cancelled") {
                    Alert.alert(error.message);
                }
                // console.log(error);
            });
    }

    render() {
        // console.log(this.props.auth.paymentMethods[0], 'PRUEBA', this.props.auth.paymentMethods)
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                        <View style={styles.container}>
                            <BackButton navigation={this.props.navigation} />
                            <Header title="Payment" />
                            <MapView
                                initialRegion={{ latitude: this.state.location.coordinates.latitude, longitude: this.state.location.coordinates.longitude, latitudeDelta: 20, longitudeDelta: 20 }}
                                style={styles.mainImage}
                                source={require("../../../../../assets/images/slika3.png")} >
                            </MapView>
                            <Text style={[styles.blackText, { fontSize: 16, marginTop: 32 }]}>Delivery Details</Text>
                            <View style={styles.rowContainerModifier}>
                                <Text style={styles.greyText}>Bag Total:</Text>
                                <Text style={styles.blackText}>${this.state.total}</Text>
                            </View>
                            <View style={styles.rowContainerModifier}>
                                <Text style={styles.greyText}>Drop Off Time:</Text>
                                <Text style={styles.blackText}>{this.state.time}</Text>
                            </View>
                            <View style={styles.rowContainerModifier}>
                                <Text style={styles.greyText}>Drop Off Location:</Text>
                                <Text style={styles.blackText}>{this.props.auth.address[this.props.auth.selectedAddress].split(', ')[1]}</Text>
                            </View>
                            <Text style={[styles.blackText, { fontSize: 16, marginTop: 32 }]}>Payment</Text>
                            {this.props.auth.paymentMethods.filter((item) => { return item.is_default === 'YES' })[0] && <View style={styles.rowContainerModifier}>
                                <Text style={styles.greyText}>Payment method:</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Image
                                        style={styles.masterCardIcon}
                                        source={require("../../../../../assets/icons/mastercard.png")} />
                                    <Text style={styles.blackText}>**** **** **** {this.props.auth.paymentMethods.filter((item) => { return item.is_default === 'YES' })[0].card_number.substr(12)}</Text>
                                </View>
                            </View>}
                            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 39 }}>
                                <Text style={styles.greyText}>Add payment method:</Text>
                                <TouchableOpacity  onPress={()=>{
                                    this.setState({showModal: true})
                                    }} style={styles.addPaymentMethod}>
                                    <Ionicons name="add-circle-sharp" size={27} color={"#1A2D5A"} />
                                </TouchableOpacity>
                                {/* <TouchableOpacity onPress={() => {
                                    this._onPayYouGo()
                                }} style={styles.addPaymentMethod}>
                                    <Ionicons name="add-circle-sharp" size={27} color={"#1A2D5A"} />
                                </TouchableOpacity> */}
                            </View>
                            <Button blue={true} title={"PLACE ORDER $" + this.state.total} func={this.successFunc} />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <Modal
                    animationType="slide"
                    visible={this.state.showModal}
                    transparent={true}>
                    <View style={styles.modalMainContainer}>
                        <View style={styles.modalContainer}>
                            <View style={styles.closeButtonContainer}>
                                <TouchableOpacity
                                    style={{ padding: 5 }}
                                    onPress={() => this.setState({ showModal: !this.state.showModal })}>
                                    <Ionicons name="close" size={30} color={"#1A2D5A"} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.modalBoldText}>Add new card</Text>
                            <View style={[styles.inputContainer, { marginTop: 41 }]}>
                                <InputField input={this.state.newCard.cardName}
                                    placeholder="Name on card"
                                    state="cardName"
                                    update={true}
                                    updateFunc={(state, change) => {
                                        this.setState({ newCard: { ...this.state.newCard, cardName: change } })
                                    }}
                                    errorMessage={this.state.addPaymentPressed && this.state.newCard.cardName.length === 0 ? CARD_NAME_ERROR : null} />
                            </View>
                            <View style={[styles.inputContainer, { justifyContent: "center" }]}>
                                <InputField
                                    input={this.state.newCard.cardNumber}
                                    placeholder="Card number"
                                    type="number-pad"
                                    max={16}
                                    state="cardNumber"
                                    update={true}
                                    updateFunc={(state, change) => {
                                        this.setState({ newCard: { ...this.state.newCard, cardNumber: change } })
                                    }}
                                    errorMessage={this.state.addPaymentPressed && this.state.newCard.cardNumber.length === 0 ? CARD_NUMBER_ERROR : null}
                                    errorMessage2={this.state.newCard.cardNumber.length > 0 && this.state.newCard.cardNumber.length < 16 ? INVALID_CARD_NUMBER : null} />
                                <View style={styles.cvvIcon}>
                                    <Image
                                        style={styles.masterCardIcon}
                                        source={require("../../../../../assets/icons/mastercard.png")} />
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <InputField
                                    expired_date={true}
                                    input={this.state.newCard.expired_date}
                                    placeholder="Expire Date"
                                    type="number-pad"
                                    max={5}
                                    state="expired_date"
                                    update={true}
                                    updateFunc={(state, change) => {
                                        this.setState({ newCard: { ...this.state.newCard, expired_date: change } }, () => { this.parseExpireDate() })
                                    }}
                                    errorMessage={this.state.addPaymentPressed && this.state.newCard.expired_date.length === 0 ? EXPIRE_DATE_ERROR : null}
                                />
                            </View>
                            <View style={[styles.inputContainer, { justifyContent: "center" }]}>
                                <InputField
                                    input={this.state.newCard.cvv}
                                    placeholder="CVV"
                                    type="number-pad"
                                    max={3}
                                    state="cvv"
                                    update={true}
                                    updateFunc={(state, change) => {
                                        this.setState({ newCard: { ...this.state.newCard, cvv: change } })
                                    }}
                                    errorMessage={this.state.addPaymentPressed && this.state.newCard.cvv.length === 0 ? CVV_ERROR : null}
                                    errorMessage2={this.state.addPaymentPressed && this.state.newCard.cvv.length > 0 && this.state.newCard.cvv.length < 3 ? INVALID_CVV_NUMBER : null}
                                />
                                <View style={styles.cvvIcon}>
                                    <EvilIcons name="question" size={35} color={"#DADADA"} />
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ defaultModal: !this.state.defaultModal })
                                }}
                                style={[styles.rowContainer1, { marginBottom: 20 }]}>
                                <View style={styles.defaultMiniContainer}>
                                    {this.state.defaultModal ?
                                        <MaterialIcons name="done" size={20} color={"white"} /> : null}
                                </View>
                                <Text style={styles.defaultText}>Set as default payment method</Text>
                            </TouchableOpacity>
                            <Button blue={true} loading={this.state.loading} title="ADD NEW CARD" func={() => {
                                this.addPayment();
                            }} />
                        </View>
                    </View>

                </Modal>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        cart: state.cart
    };
}

export default connect(mapStateToProps, { initUser })(Payment)