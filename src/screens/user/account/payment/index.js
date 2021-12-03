import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, Image, TouchableOpacity, Modal } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import styles from './styles';

import BackButton from '../../../../components/backButton';
import Header from '../../../../components/headerText';
import InputField from '../../../../components/textInput';
import Button from '../../../../components/button';
import PaymentMethod from '../../../../components/paymentMethod';
import { CARD_NAME_ERROR, CARD_NUMBER_ERROR, CVV_ERROR, EXPIRE_DATE_ERROR, INVALID_CARD_NUMBER, INVALID_CVV_NUMBER } from '../../../../config/errorMessages';

import PaymentService from '../../../../services/PaymentServices';
import WelcomeHomeModal from '../../../../components/welcomeHomeModal';

class Payment extends React.Component {
    paymentService = new PaymentService();
    constructor(props) {
        super(props);

        this.state = {
            default: 0,
            modalVisible: false,
            defaultModal: true,
            paymentMethods: this.props.route.params.paymentMethods ? this.props.route.params.paymentMethods : [],
            newCard: {
                cardName: '',
                cardNumber: '',
                cvv: '',
                expired_date: '',
            }
        }
    }

    addNewCardFunc = () => {
        this.setState({ modalVisible: false });
    }

    parseExpireDate = () => {
        if (this.state.newCard.expired_date.length === 2) {
            if (!this.state.line) {
                this.setState({newCard: {...this.state.newCard, expired_date: this.state.newCard.expired_date + "/"}, line: true})
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
                    userID: this.props.route.params.userID,
                    expired_date: this.state.newCard.expired_date,
                    cvv: this.state.newCard.cvv,
                    account_name: this.state.newCard.cardName,
                    card_number: this.state.newCard.cardNumber
                }
                console.log("DEBUG", card)
                this.paymentService.addCard(card).then(res => {
                    console.log("Response, cool", res.paymentmethodlist)
                    this.setState({ loading: false , paymentMethods: res.paymentmethodlist, modalVisible: false, modalText: 'Payment method is added successfully.', showModal: true}, () => {
                        
                    });
                }, error => {
                    this.setState({ loading: false, modalText: 'Something went wrong!', showModal: true });
                });

            } else {
                this.setState({ loading: false });
            }
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
                            <Modal
                                animationType="slide"
                                visible={this.state.modalVisible}
                                transparent={true}>
                                <View style={styles.modalMainContainer}>
                                    <View style={styles.modalContainer}>
                                        <View style={styles.closeButtonContainer}>
                                            <TouchableOpacity
                                                style={{ padding: 5 }}
                                                onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}>
                                                <Ionicons name="close" size={30} color={"#1A2D5A"} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.modalBoldText}>Add new card</Text>
                                        <View style={[styles.inputContainer, { marginTop: 41 }]}>
                                            <InputField input={this.state.newCard.cardName}
                                                placeholder="Name on card"
                                                state="cardName"
                                                update={true}
                                                updateFunc={(state, change)=>{
                                                    this.setState({newCard: {...this.state.newCard, cardName: change}})
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
                                            updateFunc={(state, change)=>{
                                                this.setState({newCard: {...this.state.newCard, cardNumber: change}})
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
                                            updateFunc={(state, change)=>{
                                                this.setState({newCard: {...this.state.newCard, expired_date: change}}, ()=>{this.parseExpireDate()})
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
                                            updateFunc={(state, change)=>{
                                                this.setState({newCard: {...this.state.newCard, cvv: change}})
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
                                            style={[styles.rowContainer, { marginBottom: 20 }]}>
                                            <View style={styles.defaultMiniContainer}>
                                                {this.state.defaultModal ?
                                                    <MaterialIcons name="done" size={20} color={"white"} /> : null}
                                            </View>
                                            <Text style={styles.defaultText}>Set as default payment method</Text>
                                        </TouchableOpacity>
                                        <Button blue={true} loading={this.state.loading} title="ADD NEW CARD" func={()=>{
                                            this.addPayment();    
                                        }} />
                                    </View>
                                </View>

                            </Modal>
                            {this.state.showModal &&
                                <WelcomeHomeModal text1={this.state.modalText}/>
                            }
                            <BackButton navigation={this.props.navigation} />
                            <Header title="Payment" />
                            <Text style={styles.boldText}>Your Payment cards</Text>
                            <ScrollView style={{position: 'relative'}}>
                                {this.state.paymentMethods.map((cardData, index) => {
                                    return <React.Fragment>
                                        <PaymentMethod key={index} name={cardData.account_name} expDate={cardData.expire_date} cardNumber={cardData.card_number}/>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({ default: index })
                                            }}
                                            style={styles.rowContainer}>
                                            <View style={[styles.checkBox, { backgroundColor: this.state.default === index ? "#1A2D5A" : "#F9F9F9", borderWidth: this.state.default === index ? 0 : 1 }]}>
                                                {this.state.default === index ?
                                                    <MaterialIcons name="done" size={17} color={"white"} /> : null}
                                            </View>
                                            <Text style={styles.text}>Use as  default payment method</Text>
                                        </TouchableOpacity>
                                    </React.Fragment> 
                                })}
                            </ScrollView>
                            <View style={styles.addPaymentContainer}>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ modalVisible: true })
                                }}>
                                    <Ionicons name="add-circle" size={50} color={"#1A2D5A"} style={styles.addIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}


export default Payment;