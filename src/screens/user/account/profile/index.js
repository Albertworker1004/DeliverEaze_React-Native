import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Image,
    TouchableOpacity,
    Alert, RefreshControl
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { connect } from 'react-redux';
import { initUser } from '../../../../redux/actions';

import styles from './styles';

import BackButton from '../../../../components/backButton';
import Header from '../../../../components/headerText';
import TextInput from '../../../../components/textInput';
import Button from '../../../../components/button';

import AuthService from '../../../../services/AuthServices';
import WelcomeModal from '../../../../components/welcomeHomeModal';

class Profile extends React.Component {
    authService = new AuthService();

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            disabled: true,
            image: this.props.auth.photo,
            selectedImage: this.props.auth.photo,
            fullname: this.props.auth.name,
            phoneNumber: this.props.auth.phone,
            imageLoaded: false,
            showModal: false,
            reload: false,
        };
    }

    saveFunc = () => {
        this.props.navigation.goBack();
    };

    componentDidMount = () => {
        this.getDetailsData();
    };

    componentDidUpdate = () => {
        if (
            this.state.fullname !== this.props.auth.name ||
            this.state.selectedImage !== this.props.auth.photo ||
            this.state.phoneNumber !== this.props.auth.phone
        ) {
            if (this.state.disabled) {
                this.setState({ disabled: false });
            }
        } else {
            if (!this.state.disabled) {
                this.setState({ disabled: true });
            }
        }
    };

    updateState = (key, value) => {
        this.setState({
            [key]: value,
        });
    };

    processResponse = async (response) => {
        // Exits if Response is Invalid
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

    getDetailsData = () => {
        this.setState({reload: true})
        console.log('calling')
        let formdata = new FormData();
        formdata.append('userID', this.props.auth.userID);
        this.authService.getUserDetails(formdata, async (res) => {
            console.log(res.response.userinfo)
            this.setState({
                fullname : res.response.userinfo.fullname,
                phoneNumber: res.response.userinfo.phonenumber,
                email : res.response.userinfo.email,
                selectedImage : res.response.userinfo.photourl,
                business_type : res.response.userinfo.business_type,
                paymentMethods: res.response.paymentmethodslist,
                address: res.response.userinfo.address.split(' & ')
            })
        });
        this.setState({reload: false})
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

    update = () => {
        this.setState({ loading: true }, async () => {
            let formData = new FormData();
            formData.append('userID', this.props.auth.userID);
            formData.append('fullname', this.state.fullname);
            formData.append('phonenumber', this.state.phoneNumber);
            this.state.imageLoaded
                ? formData.append('photo', this.state.image)
                : null;

            const headers = {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
            };

            this.authService.update(formData, async (res) => {
                const updatedUser = {
                    userID: res.response.userinfo.userID,
                    name: res.response.userinfo.fullname,
                    email: res.response.userinfo.email,
                    phoneNumber: res.response.userinfo.phonenumber,
                    userPhoto: res.response.userinfo.photourl,
                };
                await this.props.initUser(updatedUser);
                this.setState({ showModal: true })
                setTimeout(() => {
                    this.setState({ loading: false }, () => {
                        this.props.navigation.goBack();
                    })
                },
                    2000
                )
            });
        });
    };

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    style={styles.container}>
                    <ScrollView 
                    refreshControl = {
                        <RefreshControl
                            colors={["red", "green", "blue"]}
                            tintColor = 'blue'
                            refreshing = {this.state.reload}
                            onRefresh = {() => {
                                this.setState({reload: true})
                                this.getDetailsData();
                            }}
                         />   
                    }
                    contentContainerStyle={styles.scrollViewContaier}>
                        <View style={styles.container}>
                            {this.state.showModal &&
                                <WelcomeModal text1='Your profile is updated successfully.' text2="" />
                            }
                            <BackButton navigation={this.props.navigation} />
                            <View style={styles.userInfoContainer}>
                                <View>
                                    <Image
                                        style={styles.avatarIcon}
                                        source={
                                            this.state.selectedImage == undefined || this.state.selectedImage == ''
                                                ? require('../../../../../assets/icons/logo.png')
                                                : { uri: this.state.selectedImage }
                                        }
                                    />
                                    <View style={styles.addAvatarContainer}>
                                        <TouchableOpacity onPress={() => this.pickImage()}>
                                            <Ionicons name="add-circle" size={40} color="#1A2D5A" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Header title={this.state.fullname} />
                            </View>
                            <View style={styles.inputFieldContainer}>
                                <TextInput
                                    update={true}
                                    updateFunc={this.updateState}
                                    state="fullname"
                                    editButton={true}
                                    input={this.state.fullname}
                                    placeholder="Full Name"
                                />
                            </View>
                            <View style={styles.inputFieldContainer}>
                                <TextInput
                                    update={true}
                                    editButton={true}
                                    state="phoneNumber"
                                    updateFunc={this.updateState}
                                    input={this.state.phoneNumber}
                                    placeholder="Phone Number"
                                />
                            </View>
                            <View style={styles.inputFieldContainer}>
                                <TextInput
                                    editButton={false}
                                    input={this.state.email}
                                    placeholder="Email Address"
                                />
                            </View>
                            <View style={[styles.inputFieldContainer, { marginBottom: 40 }]}>
                                <TextInput
                                    editButton={false}
                                    changeButton={false}
                                    input=""
                                    placeholder="Password"
                                />
                            </View>

                            <Button
                                blue={true}
                                title="UPDATE"
                                func={this.update}
                                disabled={this.state.disabled}
                                loading={this.state.loading}
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

export default connect(mapStateToProps, { initUser })(Profile);