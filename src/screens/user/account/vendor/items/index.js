import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, RefreshControl, FlatList, Switch, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

import BackButton from '../../../../../components/backButton';
import Header from '../../../../../components/headerText';
import Entypo from 'react-native-vector-icons/Entypo';

import AuthService from '../../../../../services/AuthServices';
import { connect } from 'react-redux';


class Items extends React.Component {

    authService = new AuthService();

    constructor(props) {
        super(props);

        this.state = {
            reload : false,
            loading : false,
            itemList : [],
            modifierList : [],

        }
    }

    componentDidMount() {
        this.getVendorItem()
        this.getVendorModifierList()
    }

    getVendorItem = () => {
        let formData = new FormData();
        formData.append('userID', this.props.auth.userID);

        this.authService.getVendorItem(formData, async (res) => {

            //tempcode
            let tempArray = []
            res.response.itemlist.map(item => {
                tempArray.push({
                    itemID: item.itemID, 
                    item_description: item.item_description, 
                    item_name: item.item_name, 
                    item_photourl: item.item_photourl, 
                    item_price: item.item_price, 
                    modifierlist: item.modifierlist, 
                    userID: item.userID,
                    item_checked : false
                })
            })
            this.setState({itemList :  tempArray})
            //tempcode

            // this.setState({itemList :  res.response.itemlist})
        });
    }

    getVendorModifierList = () => {
        let formData = new FormData();
        formData.append('userID', this.props.auth.userID);

        this.authService.getVendorModifiList(formData, async (res) => {
            this.setState({modifierList :  res.response.modifierlist})
        });
    }

    renderItem = ({ item, index }) => {
        let selectedModifierList = []
        let selectedModifierName = ''
        let tempItem = this.state.itemList
        if(item.modifierlist.length > 0){
            let modifiers = item.modifierlist.split(',')
            modifiers.map(id => {
                let temp = selectedModifierList
                let filterData = (this.state.modifierList.filter(item => item.modifierID == id))
                selectedModifierList = [...temp, ...filterData]
            })
            selectedModifierList.map(item => {
                if(selectedModifierName.length > 0){
                    selectedModifierName += ', '
                }
                selectedModifierName += item.modifier_name
            })
        }
        return (
            <View style={styles.itemContainer}>
                <Image
                    style={styles.image}
                    source={{uri : item.item_photourl}} />
                <View style={{ flex: 1, paddingRight: 15 }}>
                    <View style={[styles.rowContainer2, {marginTop : 10}]}>
                        <Text style={styles.itemBoldText}>{item.item_name}</Text>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("VendorAddItems", { data : item, modifierList : this.state.modifierList, seletectModifier : selectedModifierList, refresh : this.getVendorItem })}
                            style={{ padding: 5 }}>
                            <Entypo name="edit" size={18} color={"#1A2D5A"} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.greyText}>{selectedModifierName}</Text>
                    <View style={[styles.rowContainer2, { marginTop: 9, marginBottom : 10 }]}>
                        <Text style={styles.itemBoldText}>${item.item_price}</Text>
                        <View style={styles.itemRowContainer}>
                            <Text style={[styles.availableText, { color: item.item_checked ? "#04A946" : "#AEAEAE" }]}>{item.item_checked ? "Available" : "Unavailable"}</Text>
                            <Switch
                                trackColor={{ false: "#AEAEAE", true: "#04A946" }}
                                thumbColor={"white"}
                                ios_backgroundColor="#AEAEAE"
                                onValueChange={() => {
                                    item.item_checked = !item.item_checked
                                    tempItem[index] = item
                                    this.setState({itemList : tempItem})
                                }}
                                value={item.item_checked}
                            />
                        </View>
                    </View>
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
                    <ScrollView 
                        style={styles.scrollViewContainer}
                        refreshControl = {
                            <RefreshControl
                                colors={["red", "green", "blue"]}
                                tintColor = 'blue'
                                refreshing = {this.state.reload}
                                onRefresh = {() => {
                                    this.getVendorItem()
                                }}
                            />   
                    }>
                        <View style={styles.container}>
                            <BackButton navigation={this.props.navigation} />
                            <Header title={this.props.route.params.title} />
                            <View style={{ marginTop: 16 }}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate("VendorAddItems", {data : '', modifierList : this.state.modifierList, refresh : this.getVendorItem})}
                                    style={styles.rowContainer}>
                                    <Ionicons name="add-circle" size={30} color={"#1A2D5A"} />
                                    <Text style={styles.boldText}>Add new Item</Text>
                                </TouchableOpacity>
                                <FlatList
                                    data={this.state.itemList}
                                    renderItem={this.renderItem}
                                    keyExtractor={(item) => { item.index }}
                                />
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
};

export default connect(mapStateToProps, null)(Items);