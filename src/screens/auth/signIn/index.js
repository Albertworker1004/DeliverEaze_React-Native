import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { initState, initUser } from '../../../redux/actions';
import styles from './styles';

import BackButton from '../../../components/backButton';
import Header from '../../../components/headerText';
import InputField from '../../../components/textInput';
import Button from '../../../components/button';

import { validateEmail } from '../../../utils/validationUtils';
import { EMAIL_ERROR, PASSWORD_ERROR } from '../../../config/errorMessages';

import AuthServices from '../../../services/AuthServices';

class SignIn extends React.Component {

    authServices = new AuthServices();

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            signInPressed: false,
            error: "",
            validEmail: validateEmail(this.props.auth.email)
        }
    }

    componentDidMount = () => {
    }

    login = async () => {
        this.setState({ loading: true, signInPressed: true }, () => {

            if (this.props.auth.email.length > 0 &&
                this.props.auth.password.length > 0 &&
                validateEmail(this.props.auth.email).length === 0) {
                let formdata = new FormData()
                formdata.append('email', this.props.auth.email)
                formdata.append('password', this.props.auth.password)
                formdata.append('device_type', Platform.OS === "ios" ? 1 : 0)
                formdata.append('device_token', 123456789)
                formdata.append('action_time', new Date().toString())

                this.authServices.login(formdata, async res => {
                    const user = {
                        userID: res.response.userinfo.userID,
                        name: res.response.userinfo.fullname,
                        email: res.response.userinfo.email,
                        phoneNumber: res.response.userinfo.phonenumber,
                        userPhoto: res.response.userinfo.photourl
                    };
                    await this.props.initUser(user);
                    this.setState({ loading: false, error: "" }, () => {
                        this.props.navigation.navigate("Tab", {
                            screen: "Home",
                            params: {
                                screen: "Home",
                                params: {
                                    login: true
                                }
                            }
                        });
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
                    <View style={styles.container}>
                        <ScrollView
                            contentContainerStyle={styles.scrollViewContainer}>
                            <View style={{ flex: 1, justifyContent: "space-between" }}>
                                <View>
                                    <BackButton navigation={this.props.navigation} func={this.props.initState} />
                                    <Header title="Sign in" />
                                    <View style={styles.errorContainer}>
                                        <Text style={styles.errorText}>{this.state.error}</Text>
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <InputField
                                            input={this.props.auth.email}
                                            placeholder="Email"
                                            state="email"
                                            type="email-address"
                                            errorMessage2={this.props.auth.email.length > 0 ? validateEmail(this.props.auth.email) : null}
                                            errorMessage={this.state.signInPressed && this.props.auth.email.length === 0 ? EMAIL_ERROR : null} />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <InputField
                                            input={this.props.auth.password}
                                            placeholder="Password"
                                            state="password"
                                            secure={true}
                                            errorMessage={this.state.signInPressed && this.props.auth.password.length === 0 ? PASSWORD_ERROR : null} />
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate("ForgotPassword")}
                                        style={styles.forgotPasswordButton}>
                                        <Text style={styles.forgotPasswordButtonText}>Forgot your password?</Text>
                                    </TouchableOpacity>
                                    <Button blue={true} title="SIGN IN" func={this.login} loading={this.state.loading} />
                                </View>
                                <View style={styles.socialLoginContainer}>
                                    <Text style={styles.forgotPasswordButtonText}>Or sign in with social account</Text>
                                    <View style={styles.rowContainer}>
                                        <View style={[styles.socialButtonContainer, { marginRight: 16 }]}>
                                            <Image
                                                style={styles.socialButtonIcon}
                                                source={require("../../../../assets/icons/googleIcon.png")} />
                                        </View>
                                        <View style={styles.socialButtonContainer}>
                                            <Image
                                                style={styles.socialButtonIcon}
                                                source={require("../../../../assets/icons/facebookIcon.png")} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
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

export default connect(mapStateToProps, { initState, initUser })(SignIn);