import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, TextInput, Image, FlatList, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RBSheet from "react-native-raw-bottom-sheet";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

import BackButton from '../../../../../../components/backButton';
import Header from '../../../../../../components/headerText';
import Button from '../../../../../../components/button';

import AuthService from '../../../../../../services/AuthServices';
import { connect } from 'react-redux';

class Website extends React.Component {

    authService = new AuthService();

    constructor(props) {
        super(props);

        this.state = {
            loading : false,
            description: this.props.route.params.data == '' ? '' : this.props.route.params.data.item_description,
            selectedImage : this.props.route.params.data == '' ? '' : this.props.route.params.data.item_photourl,
            image : this.props.route.params.data == '' ? '' : this.props.route.params.data.item_photourl,
            modifierList : this.props.route.params.modifierList,
            selectedModifierList : this.props.route.params.data == ''? [] : this.props.route.params.seletectModifier,
            item_name : this.props.route.params.data == '' ? '' : this.props.route.params.data.item_name,
            item_price : this.props.route.params.data == '' ? '' : this.props.route.params.data.item_price
        }
    }

    componentDidMount() {
    }

    addItemFunc = () => {
        if(this.state.item_name.length > 0 &&
            this.state.description.length > 0 &&
            this.state.item_price.length > 0 &&
            this.state.selectedImage.length > 0 )
        {
            this.setState({loading : true})
            let modifiList = ''
            this.state.selectedModifierList.map(item => {
                if(modifiList.length > 0){
                    modifiList += ','
                }
                modifiList += item.modifierID
            })
            let formData = new FormData();
            formData.append('userID', this.props.auth.userID);
            formData.append('item_name', this.state.item_name);
            formData.append('item_description', this.state.description);
            formData.append('item_price', this.state.item_price);
            formData.append('modifierlist', modifiList);
            formData.append('itemphoto', this.state.image);
            
            if(this.props.route.params.data == ''){
                this.authService.addVendorItem(formData, async (res) => {
                    this.setState({loading : false})
                    this.props.route.params.refresh()
                    this.props.navigation.goBack();
                });
            }
            else{
                formData.append('itemID', this.props.route.params.data.itemID);
                this.authService.updateVendorItem(formData, async (res) => {
                    this.setState({loading : false})
                    this.props.route.params.refresh()
                    this.props.navigation.goBack();
                });
            }
        }
        else{
            Alert.alert('Alert', 'Please fill out all field')
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

    closeModal = () => {
        this.modifierModal.close()
    }

    modifierItem = ({ item, index }) => {
        let isChecked = this.state.selectedModifierList.findIndex(modifier => modifier.modifierID == item.modifierID) == -1 ? false : true
        return (
            <View style={[styles.accountItem,]}>
                <View>
                    <Text style={styles.accountItemTitle}>{item.modifier_name}</Text>
                </View>
                <TouchableOpacity
                    style={styles.secondShiftButton}
                    onPress={() => {
                        if(isChecked){
                            let tempArray1 = this.state.selectedModifierList.filter(filterItem => filterItem.modifierID != item.modifierID)
                            this.setState({selectedModifierList : tempArray1})
                        }
                        else{
                            let tempArray2 = this.state.selectedModifierList
                            tempArray2.push(item)
                            this.setState({selectedModifierList : tempArray2})
                        }
                    }}>
                    <View style={[styles.checkBox, { backgroundColor: isChecked ? "#1A2D5A" : "#F9F9F9", borderWidth: isChecked ? 0 : 1 }]}>
                        {isChecked ?
                            <MaterialIcons name="done" size={17} color={"white"} /> : null}
                    </View>
                </TouchableOpacity>
            </View>
        )
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
                            <Header title={this.props.route.params.data != '' ? "Edit Item" : "Add Item"} />
                            <View style={{ marginTop: this.props.route.params ? 32 : 32 }}>
                                <View style={[styles.inputContainer, { flex: 1, paddingLeft : 10, marginRight: 16, padding : 10, backgroundColor : 'white'}]}>
                                    <Text style = {{color : '#B8B6B6', fontSize : 12, marginBottom : 10, paddingLeft : 5}}>
                                        Item Name
                                    </Text>
                                    <TextInput 
                                        placeholder = 'Item Name'
                                        value = {this.state.item_name}
                                        style={{ color : '#1A2D5A', height: 30, paddingLeft: 5, borderRadius: 5 }} 
                                        onChangeText = {(value) => {
                                            this.setState({item_name : value})
                                        }}
                                    />
                                </View>
                            </View>
                            <TextInput
                                placeholder="Item Description"
                                placeholderTextColor="#9B9B9B"
                                multiline={true}
                                style={styles.inputField}
                                onChangeText={description => this.setState({ description })}
                                value={this.state.description} />
                                <View>
                                    <TouchableOpacity
                                        onPress={() => this.pickImage()}
                                        style={[styles.rowContainer, { marginTop: 32 }]}>
                                        <Ionicons name="add-circle" size={30} color={"#1A2D5A"} />
                                        <Text style={styles.boldText}>Item Photo</Text>
                                    </TouchableOpacity>

                                    <View style={styles.imageContainer}>
                                        {this.state.selectedImage.length > 0 &&
                                            <TouchableOpacity
                                            style={{ position: "absolute", zIndex: 10, top: -7, right: -7 }}
                                            onPress={() => this.setState({image : '', selectedImage : ''})}>
                                                <Ionicons name="close-circle" size={20} color={"#1A2D5A"} />
                                            </TouchableOpacity>
                                        }
                                        <Image
                                            style={styles.image}
                                            source={{uri : this.state.selectedImage}} />
                                    </View>
                                </View>
                                <View style={{ width: "50%", marginTop: 32 }}>
                                    <View style={[styles.inputContainer, { flex: 1, paddingLeft : 10, marginRight: 16, padding : 10, backgroundColor : 'white'}]}>
                                        <Text style = {{color : '#B8B6B6', fontSize : 12, marginBottom : 10, paddingLeft : 5}}>
                                            Price
                                        </Text>
                                        <TextInput 
                                            placeholder = 'Price'
                                            value = {this.state.item_price}
                                            style={{ color : '#1A2D5A', height: 30, paddingLeft: 5, borderRadius: 5 }} 
                                            onChangeText = {(value) => {
                                                this.setState({item_price : value})
                                            }}
                                        />
                                    </View>
                                </View>
                            <Text style={styles.text}>Modifier</Text>
                            {this.state.selectedModifierList.map(item => {
                                return <Text style={{ color: "#1A2D5A", marginTop: 19 }}>{item.modifier_name}</Text>
                            })}
                            <TouchableOpacity
                                onPress={() => {
                                    this.modifierModal.open()}
                                }
                                style={[styles.rowContainer, { marginTop: this.props.route.params ? 32 : 32 }]}>
                                <Ionicons name="add-circle" size={30} color={"#1A2D5A"} />
                                <Text style={styles.boldText}>Add Modifier</Text>
                            </TouchableOpacity>
                            <Button blue={true} loading = {this.state.loading} title={this.props.route.params.data == '' ? "ADD" : "SAVE"} func={this.addItemFunc} />
                        </View>
                    </ScrollView>
                    <RBSheet
                        ref={ref => {
                            this.modifierModal = ref;
                        }}
                        closeOnPressMask = {false}
                        closeOnDragDown = {false}
                        closeOnPressBack = {false}
                        height={500}
                        openDuration={250}
                        customStyles={{
                            container: {}
                        }}
                        >
                        <Text style = {[styles.text, {textAlign : 'center'}]}>Modifiers</Text>
                        <FlatList
                            data={this.state.modifierList}
                            renderItem={this.modifierItem}
                            keyExtractor={(item) => { item.index }}
                            style = {{
                                padding : 20
                            }}
                        />
                        <Button blue={true} loading = {this.state.loading} title='Select' func={this.closeModal} />
                    </RBSheet>
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

export default connect(mapStateToProps, null)(Website);