import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

import BackButton from '../../../../../../components/backButton';
import Button from '../../../../../../components/button';
import AuthService from '../../../../../../services/AuthServices';
import { connect } from 'react-redux';

class Modifier extends React.Component {

    authService = new AuthService();

    constructor(props) {
        super(props);

        this.state = {
            loading : false,
            required: this.props.route.params.data == '' ? true : this.props.route.params.data.is_required == 1 ? true : false,
            min: this.props.route.params.data == '' ? '' : this.props.route.params.data.min_selected,
            max: this.props.route.params.data == '' ? '' : this.props.route.params.data.max_selected,
            modifiers: [],
            modifier_name : this.props.route.params.data == '' ? '' : this.props.route.params.data.modifier_name,
            modifier_id : this.props.route.params.data.modifierID
        }
    }

    componentDidMount() {
        this.processItemList()
    }

    processItemList = () => {
        if(this.props.route.params.data != '')
        {
            let item = this.props.route.params.data.itemlist
            let itemList = item.split(' & ')
            let tempArray = []
            itemList.map(eachItem => {
                tempArray.push({ name: eachItem.split('/')[0], price: eachItem.split('/')[1] })
            })
            this.setState({modifiers : tempArray})
        }
    }

    addFunc = () => {
            if(this.state.modifiers.length > 0){
                for(let item of this.state.modifiers){
                    if(item.name == '' || item.price == ''){
                        Alert.alert('Alert', 'Please fill out the fields')
                        return
                    }
                }
            }
            if(this.state.modifier_name && this.state.modifiers.length > 0){
                this.setState({loading : true})
                let itemList = ''
                if(this.state.modifiers.length > 0){
                    this.state.modifiers.map(item => {
                        if(itemList.length > 0){
                            itemList += ' & '
                        }
                        itemList += item.name + '/' + item.price
                    })
                }
                let formData = new FormData();
                formData.append('userID', this.props.auth.userID);
                formData.append('modifier_name', this.state.modifier_name);
                formData.append('is_required', this.state.required == true ? '1' : '0');
                formData.append('min_selected', this.state.min);
                formData.append('max_selected', this.state.max);
                formData.append('itemlist', itemList);

                if(this.props.route.params.data == ''){
                    this.authService.addVendorModifier(formData, (res) => {
                        this.setState({loading : false})
                        this.props.route.params.refresh()
                        this.props.navigation.goBack();
                    });
                }
                else{
                    formData.append('modifierID', this.state.modifier_id)
                    this.authService.updateVendorModifier(formData, (res) => {
                        this.setState({loading : false})
                        this.props.route.params.refresh()
                        this.props.navigation.goBack();
                    });
                }
                
            }
            else{
                Alert.alert('Alert', 'Please fill out field')
            }
    }

    modifierItem = ({ item, index }) => {
        let tempArray = this.state.modifiers
        return (
            <View style={[styles.row, { justifyContent: "space-between", marginBottom: 5 }]}>
                <TextInput
                    style={[styles.greyText, { borderWidth: 0.5, borderColor: 'grey', fontWeight: "bold", color : '#1A2D5A', width: '30%', height: 25, borderRadius: 5, paddingLeft: 5 }]}
                    value={item.name}
                    onChangeText={(value) => {
                        tempArray[index].name = value
                        this.setState({ modifiers: tempArray })
                    }}
                />
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ color: "#8D8D89" }}>...................................</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TextInput
                        style={{ fontWeight: "bold", color : '#1A2D5A',  marginRight: 12, borderWidth: 0.5, borderColor: 'grey', width: 60, height: 25, borderRadius: 5, paddingLeft: 5 }}
                        value={ item.price}
                        onChangeText={(value) => {
                            tempArray[index].price = value
                            this.setState({ modifiers: tempArray })
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            tempArray.splice(index, 1)
                            this.setState({ modifiers: tempArray })
                        }
                        }>
                        <View style={[styles.checkBox]}>
                                <MaterialIcons name="delete" size={17} color={"#1A2D5A"} /> 
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                        <View style={styles.container}>
                            <BackButton navigation={this.props.navigation} />
                            <View style={{ marginTop: this.props.route.params ? 32 : 32 }}>
                                <View style={[styles.inputContainer, { flex: 1, paddingLeft : 10, marginRight: 16, padding : 10, backgroundColor : 'white'}]}>
                                    <Text style = {{color : '#B8B6B6', fontSize : 12, marginBottom : 10, paddingLeft : 5}}>
                                        Modifier Name
                                    </Text>
                                    <TextInput 
                                        placeholder = 'Modifier Name'
                                        value = {this.state.modifier_name}
                                        style={{ fontWeight: "bold", color : '#1A2D5A', height: 30, paddingLeft: 5, borderRadius: 5 }} 
                                        onChangeText = {(value) => {
                                            this.setState({modifier_name : value})
                                        }}
                                    />
                                </View>
                            </View>
                                <View style={[styles.row, { marginTop: 30 }]}>
                                    <Text style={styles.greyText}>Required:</Text>
                                    <TouchableOpacity
                                        disabled={this.state.required}
                                        style={{ flexDirection: "row", alignItems: "center", marginLeft: 26 }}
                                        onPress={() => this.setState({ required: !this.state.required })}>
                                        <View style={[styles.checkBox, { backgroundColor: this.state.required ? "#1A2D5A" : "#F9F9F9", borderWidth: this.state.required ? 0 : 1 }]}>
                                            {this.state.required ?
                                                <MaterialIcons name="done" size={17} color={"white"} /> : null}
                                        </View>
                                        <Text style={{ color: "#333333", marginLeft: 7 }}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        disabled={!this.state.required}
                                        style={{ flexDirection: "row", alignItems: "center", marginLeft: 26 }}
                                        onPress={() => this.setState({ required: !this.state.required })}>
                                        <View style={[styles.checkBox, { backgroundColor: !this.state.required ? "#1A2D5A" : "#F9F9F9", borderWidth: this.state.required ? 1 : 0 }]}>
                                            {!this.state.required ?
                                                <MaterialIcons name="done" size={17} color={"white"} /> : null}
                                        </View>
                                        <Text style={{ color: "#333333", marginLeft: 7 }}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            <View style={[styles.row, { marginTop: 25 }]}>
                                <Text style={styles.greyText}>Min Selected:</Text>
                                <TextInput 
                                    maxLength = {2}
                                    value = {this.state.min}
                                    style={{ borderColor: 'grey', borderWidth: 0.5, fontWeight: "bold", color : '#1A2D5A', marginLeft: 20, height: 30, width: 50, paddingLeft: 5, borderRadius: 5 }} 
                                    onChangeText = {(value) => {
                                        this.setState({min : value})
                                    }}
                                />
                            </View>
                            <View style={[styles.row, { marginTop: 17 }]}>
                                <Text style={styles.greyText}>Max Selected:</Text>
                                <TextInput 
                                    maxLength = {2}
                                    value = {this.state.max}
                                    style={{ borderColor: 'grey', borderWidth: 0.5, fontWeight: "bold", color : '#1A2D5A', marginLeft: 17, height: 30, width: 50, paddingLeft: 5, borderRadius: 5 }} 
                                    onChangeText = {(value) => {
                                        this.setState({max : value})
                                    }}
                                />
                            </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        let tempArray = this.state.modifiers
                                        tempArray.push({ name: '', price: '0.00' })
                                        console.log(tempArray)
                                        this.setState({ modifiers: tempArray })
                                    }}
                                    style={styles.rowContainer}>
                                    <Ionicons name="add-circle" size={30} color={"#1A2D5A"} />
                                    <Text style={styles.boldText}>Add Modifier</Text>
                                </TouchableOpacity> 
                                    <View style={{ height: 150 }}>
                                        <FlatList
                                            data={this.state.modifiers}
                                            renderItem={this.modifierItem}
                                            keyExtractor={(item) => { item.index }}
                                        />
                                    </View>
                            <Button blue={true} loading = {this.state.loading} title={this.props.route.params.data == '' ? "ADD" : "SAVE"} func={this.addFunc} />
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

export default connect(mapStateToProps, null)(Modifier);