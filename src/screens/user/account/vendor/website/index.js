import React from 'react';
import { View, TextInput, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';

import styles from './styles';
import { connect } from 'react-redux';

import BackButton from '../../../../../components/backButton';
import Header from '../../../../../components/headerText';
import Button from '../../../../../components/button';
import AuthService from '../../../../../services/AuthServices';

class PromoCodes extends React.Component {
    authService = new AuthService();

    constructor(props) {
        super(props);

        this.state = {
            loading : false,
            site: this.props.route.params.website
        }
    }

    saveFunc = () => {
        if(this.state.site.length > 0){
            this.setState({ loading: true }, async () => {
                let formData = new FormData();
                formData.append('userID', this.props.auth.userID);
                formData.append('restaurant_website', this.state.site);
    
                this.authService.updateVendor(formData, async (res) => {
                    this.setState({ loading: false }, () => {
                        this.props.route.params.refresh()
                        this.props.navigation.goBack();
                    })
                });
            });
        }
        else{
            Alert.alert('Alert', 'Please fill out field')
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.container}>
                    <ScrollView style={styles.scrollViewContainer}>
                        <View style={styles.container}>
                            <BackButton navigation={this.props.navigation} />
                            <Header title= {this.props.route.params.title} />
                            <TextInput
                                placeholder = 'www.blablabla.com'
                                value={this.state.site}
                                onChangeText={site => this.setState({ site })}
                                style={styles.inputField} />
                            <Button 
                                blue={true} 
                                title="SAVE" 
                                loading={this.state.loading}
                                func={this.saveFunc} 
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
        auth: state.auth,
    };
};

export default connect(mapStateToProps, null)(PromoCodes);