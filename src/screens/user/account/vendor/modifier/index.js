import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, RefreshControl, TouchableOpacity, FlatList } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

import BackButton from '../../../../../components/backButton';
import Header from '../../../../../components/headerText';
import AuthService from '../../../../../services/AuthServices';
import { connect } from 'react-redux';

class Modifier extends React.Component {

    authService = new AuthService();

    constructor(props) {
        super(props);

        this.state = {
            reload : false,
            loading : false,
            modifierList : []
        }
    }

    componentDidMount() {
        this.getVendorModifierList()
    }

    getVendorModifierList = () => {

        let formData = new FormData();
        formData.append('userID', this.props.auth.userID);

        this.authService.getVendorModifiList(formData, async (res) => {
            console.log(res.response)
            this.setState({modifierList :  res.response.modifierlist})
        });
    }

    modifierItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate("VendorAddModifier", { data : item, refresh : this.getVendorModifierList })}
                style={[styles.accountItem, { marginTop: 0 }]}>
                <View>
                    <Text style={styles.accountItemTitle}>{item.modifier_name}</Text>
                </View>
                <Entypo name="chevron-thin-right" size={16} color={"#1A2D5A"} />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.container}>
                    <ScrollView refreshControl = {
                        <RefreshControl
                            colors={["red", "green", "blue"]}
                            tintColor = 'blue'
                            refreshing = {this.state.reload}
                            onRefresh = {() => {
                                this.getVendorModifierList()
                            }}
                         />   
                    }>
                        <View style={styles.container}>
                            <View style={styles.headerContainer}>
                                <BackButton navigation={this.props.navigation} />
                                <Header title="My Modifiers" />
                            </View>

                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("VendorAddModifier", {data : '', refresh : this.getVendorModifierList})}
                                style={styles.rowContainer}>
                                <Ionicons name="add-circle" size={30} color={"#1A2D5A"} />
                                <Text style={styles.boldText}>Add Modifier</Text>
                            </TouchableOpacity>

                            <FlatList
                                data={this.state.modifierList}
                                renderItem={this.modifierItem}
                                keyExtractor={(item) => { item.index }}
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

export default connect(mapStateToProps, null)(Modifier);