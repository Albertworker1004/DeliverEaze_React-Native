import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { initState, initUser } from '../../../redux/actions';

import styles from './styles';

import BackButton from '../../../components/backButton';
import Header from '../../../components/headerText';
import InputField from '../../../components/textInput';
import Button from '../../../components/button';

import AuthService from '../../../services/AuthServices';

import { validateEmail } from '../../../utils/validationUtils';
import { EMAIL_ERROR, PASSWORD_ERROR, CONFIRM_PASSWORD_ERROR, NAME_ERROR, PHONE_ERROR, PASSWORD_MATCH } from '../../../config/errorMessages';

class Welcome extends React.Component {

    authService = new AuthService();

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            signUpPressed: false,
            error: ""
        }
    }

    signUpFunc = () => {
        this.props.navigation.navigate("AddPayment");
    }

    signUp = () => {
        this.setState({ loading: true, signUpPressed: true }, () => {
            if (this.props.auth.email.length > 0 &&
                this.props.auth.password.length > 0 &&
                this.props.auth.confirmPassword.length > 0 &&
                this.props.auth.phone.length > 0 &&
                this.props.auth.name.length > 0 &&
                (this.props.auth.password === this.props.auth.confirmPassword) &&
                validateEmail(this.props.auth.email).length === 0) {

                let formdata = new FormData()

                formdata.append('email', this.props.auth.email)
                formdata.append('fullname', this.props.auth.name)
                formdata.append('phonenumber', this.props.auth.phone)
                formdata.append('password', this.props.auth.password)
                formdata.append('device_type',  Platform.OS === "ios" ? 1 : 0)
                formdata.append('device_token', 123456789)
                formdata.append('action_time', new Date().toString())

                this.authService.signUp(formdata, async res => {
                    const user = {
                        userID: res.response.userinfo.userID,
                        name: this.props.auth.name,
                        email: res.response.userinfo.email,
                        phoneNumber: this.props.auth.phone,
                        photo: ""
                    };
                    await this.props.initUser(user);
                    this.setState({ loading: false, error: "" }, () => {
                        this.props.navigation.navigate("AddPayment");
                    });
                })
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
                            <BackButton navigation={this.props.navigation} func={this.props.initState} />
                            <Header title="Sign up" />
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>{this.state.error}</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <InputField
                                    input={this.props.auth.name}
                                    placeholder="Name"
                                    state="name"
                                    errorMessage={this.state.signUpPressed && this.props.auth.name.length < 1 ? NAME_ERROR : null} />
                            </View>
                            <View style={styles.inputContainer}>
                                <InputField
                                    input={this.props.auth.email}
                                    placeholder="Email"
                                    state="email"
                                    errorMessage={this.state.signUpPressed && this.props.auth.email.length === 0 ? EMAIL_ERROR : null}
                                    errorMessage2={this.props.auth.email.length > 0 ? validateEmail(this.props.auth.email) : null} />
                            </View>
                            <View style={styles.inputContainer}>
                                <InputField
                                    input={this.props.auth.phone}
                                    placeholder="Phone"
                                    state="phone"
                                    errorMessage={this.state.signUpPressed && this.props.auth.phone.length === 0 ? PHONE_ERROR : null} />
                            </View>
                            <View style={styles.inputContainer}>
                                <InputField
                                    paddingRight={true}
                                    input={this.props.auth.password}
                                    placeholder="Password"
                                    secure={true}
                                    state="password"
                                    errorMessage={this.state.signUpPressed && this.props.auth.password.length === 0 ? PASSWORD_ERROR : null} />
                            </View>
                            <View style={styles.inputContainer}>
                                <InputField
                                    paddingRight={true}
                                    input={this.props.auth.confirmPassword}
                                    placeholder="Confirm Password"
                                    secure={true}
                                    state="confirmPassword"
                                    errorMessage={this.state.signUpPressed && this.props.auth.confirmPassword.length === 0 ? CONFIRM_PASSWORD_ERROR : null}
                                    errorMessage2={this.props.auth.confirmPassword.length > 0 && this.props.auth.password !== this.props.auth.confirmPassword ? PASSWORD_MATCH : null} />
                                {this.props.auth.confirmPassword.length > 0 && this.props.auth.password === this.props.auth.confirmPassword ?
                                    <View style={styles.confirmPasswordDoneContainer}>
                                        <MaterialIcons name="done" size={20} color="#1A2D5A" />
                                    </View> : null}
                            </View>
                            <Button blue={true} title="SIGN UP" func={this.signUp} loading={this.state.loading} />
                            <View style={styles.socialLoginContainer}>
                                <Text style={styles.forgotPasswordButtonText}>Or sign in with social account</Text>
                                <View style={styles.rowContainer}>
                                    <View style={[styles.socialButtonContainer, { marginRight: 16 }]}>
                                        <Image
                                            style={styles.socialButtonIcon}
                                            resizeMode="stretch"
                                            source={require("../../../../assets/icons/googleIcon.png")} />
                                    </View>
                                    <View style={styles.socialButtonContainer}>
                                        <Image
                                            style={styles.socialButtonIcon}
                                            resizeMode="stretch"
                                            source={require("../../../../assets/icons/facebookIcon.png")} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps, { initUser })(Welcome);