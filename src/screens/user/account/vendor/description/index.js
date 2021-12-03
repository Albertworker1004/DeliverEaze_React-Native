import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

import styles from './styles';
import { connect } from 'react-redux';

import BackButton from '../../../../../components/backButton';
import Header from '../../../../../components/headerText';
import Button from '../../../../../components/button';

import AuthService from '../../../../../services/AuthServices';

class Description extends React.Component {
    authService = new AuthService();

    constructor(props) {
        super(props);

        this.state = {
            loading : false,
            description: this.props.route.params.description,
            selectedImage: this.props.route.params.logo,
            imageLoaded: false,
            image: this.props.route.params.logo,
        }
    }

    componentDidMount() {
    }

    saveFunc = () => {
        if(this.state.description.length > 0 && this.state.image){
            this.setState({ loading: true }, async () => {
                let formData = new FormData();
                formData.append('userID', this.props.auth.userID);
                formData.append('restaurant_description', this.state.description);
                formData.append('logophoto', this.state.image);
    
                this.authService.updateVendor(formData, async (res) => {
                    console.log(res);
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

    processResponse = async (response) => {
        if (!response?.uri) {
            return;
        }

        const format = {
            'image/jpeg': 'JPEG',
            'image/png': 'PNG',
            'image/webp': 'WEBP',
        };

        ImageResizer.createResizedImage(
            response.uri,
            500,
            500,
            format[response.type],
            100,
        )
            .then((resizedResponse) => {
                var data = {
                    uri:
                        Platform.OS === 'android'
                            ? resizedResponse.uri
                            : resizedResponse.uri.replace('file://', ''),
                    type: response.type,
                    name: resizedResponse.name,
                };
                this.setState({
                    selectedImage: response.uri,
                    image: data,
                    imageLoaded: true,
                });
            })
            .catch((err) => {
                console.log({
                    err,
                });
            });
        return;
    };

    pickImage = () => {
        const options = {
            title: 'Select Avatar',
            //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.processResponse(response);
            }
        });
    };

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
                                value={this.state.description}
                                multiline={true}
                                onChangeText={description => this.setState({ description })}
                                style={styles.inputField} />
                            <TouchableOpacity
                                onPress={() => this.pickImage()}
                                style={[styles.rowContainer, { marginTop: 0 }]}>
                                <Ionicons name="add-circle" size={30} color={"#1A2D5A"} />
                                <Text style={styles.boldText}>Add Logo/Photo</Text>
                            </TouchableOpacity>
                            <View style={styles.imageContainer}>
                                {this.state.selectedImage.length > 0 &&
                                    <View style={{ position: "absolute", zIndex: 10, top: -7, right: -7 }}>
                                        <Ionicons name="close-circle" size={20} color={"#1A2D5A"} />
                                    </View>
                                }
                                <Image
                                    style={styles.image}
                                    source={{uri : this.state.selectedImage}} />
                            </View>
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

export default connect(mapStateToProps, null)(Description);