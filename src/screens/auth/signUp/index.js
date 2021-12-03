import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, Image, AsyncStorage } from 'react-native';

import styles from './styles';
import Button from '../../../components/button';
import { initUser } from '../../../redux/actions';
import { response } from '../../../utils/responseStatusCodeUtil';
import { connect } from 'react-redux';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
    }

    signInFunc = () => {
        this.props.navigation.navigate("SignIn");
    }

    signUpFunc = () => {
        this.props.navigation.navigate("Welcome");
    }

    componentDidMount(){
        let promises = []
        promises.push(AsyncStorage.getItem('userName'))
        promises.push(AsyncStorage.getItem('userPhoneNumber'))
        promises.push(AsyncStorage.getItem('userID'))
        promises.push(AsyncStorage.getItem('userPhoto'))
        promises.push(AsyncStorage.getItem('userEmail'))
        Promise.all(promises).then((responses)=>{
            let user = {
                name: responses[0],
                phoneNumber: responses[1],
                userID: responses[2],
                userPhoto: responses[3],
                email: responses[4],
            }
            console.log(user, 'ESTE ES EL USER')
            if(user.userID){
                this.props.initUser(user)
                this.props.navigation.navigate("Tab", {
                    screen: "Home",
                    params: {
                        screen: "Home",
                        params: {
                            login: true
                        }
                    }
                });
            }
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.container}>
                    <View style={styles.container}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>Welcome to</Text>
                            <Image
                                style={styles.welcomeLogo}
                                source={require("../../../../assets/icons/welcomeLogo.png")} />
                        </View>
                        <Button blue={false} title="SIGN IN" func={this.signInFunc} />
                        <View style={styles.buttonContainer}>
                            <Button blue={true} title="GET STARTED" func={this.signUpFunc} />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

export default connect(null,{initUser})(SignUp)