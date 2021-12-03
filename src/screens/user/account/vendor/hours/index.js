import React from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';

import styles from './styles';

import { connect } from 'react-redux';

import BackButton from '../../../../../components/backButton';
import Header from '../../../../../components/headerText';
import Button from '../../../../../components/button';
import HoursItem from '../../../../../components/hoursItem';
import AuthService from '../../../../../services/AuthServices';
import moment from 'moment';

class VendorHours extends React.Component {
    authService = new AuthService()

    constructor(props) {
        super(props);

        let sundayTime = this.props.route.params.sunday.replace(/\s+/g, "")
        let mondayTime = this.props.route.params.monday.replace(/\s+/g, "")
        let tuesdayTime = this.props.route.params.tuesday.replace(/\s+/g, "")
        let wednesdayTime = this.props.route.params.wednesday.replace(/\s+/g, "")
        let thursdayTime = this.props.route.params.thursday.replace(/\s+/g, "")
        let fridayTime = this.props.route.params.friday.replace(/\s+/g, "")
        let saturdayTime = this.props.route.params.saturday.replace(/\s+/g, "")

        this.state = {
            loading: false,
            vendor_monday_start : mondayTime.length > 0 ? mondayTime.indexOf(',') != -1? mondayTime.split(',')[0].split('-')[0].length > 0 ? moment(mondayTime.split(',')[0].split('-')[0], ['hh:mm A']).format('hh:mm A') : '' : mondayTime.split('-')[0].length > 0 ? moment(mondayTime.split('-')[0], ['hh:mm A']).format('hh:mm A') : '' : '',
            vendor_monday_end : mondayTime.length > 0 ? mondayTime.indexOf(',') != -1? mondayTime.split(',')[0].split('-')[1].length > 0 ? moment(mondayTime.split(',')[0].split('-')[1], ['hh:mm A']).format('hh:mm A') : 0 : mondayTime.split('-')[1].length > 0 ? moment(mondayTime.split('-')[1], ['hh:mm A']).format('hh:mm A') : '' : '',
            vendor_monday_second : mondayTime.indexOf(',') != -1?true : false,
            vendor_monday_second_start : mondayTime.length > 0 ? mondayTime.indexOf(',') != -1? mondayTime.split(',')[1].split('-')[0].length > 0 ? moment(mondayTime.split(',')[1].split('-')[0], ['hh:mm A']).format('hh:mm A') : '' : '' : '',
            vendor_monday_second_end : mondayTime.length > 0 ? mondayTime.indexOf(',') != -1? mondayTime.split(',')[1].split('-')[1].length > 0 ? moment(mondayTime.split(',')[1].split('-')[1], ['hh:mm A']).format('hh:mm A') : '' : '' : '',
            
            vendor_tuesday_start : tuesdayTime.length > 0 ? tuesdayTime.indexOf(',') != -1? tuesdayTime.split(',')[0].split('-')[0].length > 0 ? moment(tuesdayTime.split(',')[0].split('-')[0], ['hh:mm A']).format('hh:mm A') : '' : tuesdayTime.split('-')[0].length > 0 ? moment(tuesdayTime.split('-')[0], ['hh:mm A']).format('hh:mm A') : '' : '',
            vendor_tuesday_end : tuesdayTime.length > 0 ? tuesdayTime.indexOf(',') != -1? tuesdayTime.split(',')[0].split('-')[1].length > 0 ?  moment(tuesdayTime.split(',')[0].split('-')[1], ['hh:mm A']).format('hh:mm A') : '' : tuesdayTime.split('-')[1].length > 0 ? moment(tuesdayTime.split('-')[1], ['hh:mm A']).format('hh:mm A') : '' : '',
            vendor_tuesday_second : tuesdayTime.indexOf(',') != -1?true : false,
            vendor_tuesday_second_start : tuesdayTime.length > 0 ? tuesdayTime.indexOf(',') != -1? tuesdayTime.split(',')[1].split('-')[0].length > 0 ? moment(tuesdayTime.split(',')[1].split('-')[0], ['hh:mm A']).format('hh:mm A') : '' : '' : '',
            vendor_tuesday_second_end : tuesdayTime.length > 0 ? tuesdayTime.indexOf(',') != -1? tuesdayTime.split(',')[1].split('-')[1].length > 0 ? moment(tuesdayTime.split(',')[1].split('-')[1], ['hh:mm A']).format('hh:mm A') : '' : '' : '',

            vendor_wednesday_start : wednesdayTime.length > 0 ? wednesdayTime.indexOf(',') != -1? wednesdayTime.split(',')[0].split('-')[0].length > 0 ? moment(wednesdayTime.split(',')[0].split('-')[0], ['hh:mm A']).format('hh:mm A') : '' : wednesdayTime.split('-')[0].length > 0 ? moment(wednesdayTime.split('-')[0], ['hh:mm A']).format('hh:mm A') : '' : '',
            vendor_wednesday_end : wednesdayTime.length > 0 ? wednesdayTime.indexOf(',') != -1? wednesdayTime.split(',')[0].split('-')[1].length > 0 ? moment(wednesdayTime.split(',')[0].split('-')[1], ['hh:mm A']).format('hh:mm A') : '' : wednesdayTime.split('-')[1].length > 0 ? moment(wednesdayTime.split('-')[1], ['hh:mm A']).format('hh:mm A') : '' : '',
            vendor_wednesday_second : wednesdayTime.indexOf(',') != -1?true:false,
            vendor_wednesday_second_start : wednesdayTime.length > 0 ? wednesdayTime.indexOf(',') != -1? wednesdayTime.split(',')[1].split('-')[0].length > 0 ? moment(wednesdayTime.split(',')[1].split('-')[0], ['hh:mm A']).format('hh:mm A') : '' : '' : '',
            vendor_wednesday_second_end : wednesdayTime.length > 0 ? wednesdayTime.indexOf(',') != -1? wednesdayTime.split(',')[1].split('-')[1].length > 0 ? moment(wednesdayTime.split(',')[1].split('-')[1], ['hh:mm A']).format('hh:mm A') : '' : '' : '',

            vendor_thursday_start : thursdayTime.length > 0 ? thursdayTime.indexOf(',') != -1? thursdayTime.split(',')[0].split('-')[0].length > 0 ? moment(thursdayTime.split(',')[0].split('-')[0], ['hh:mm A']).format('hh:mm A') : '' : thursdayTime.split('-')[0].length > 0 ? moment(thursdayTime.split('-')[0], ['hh:mm A']).format('hh:mm A') : '' : '',
            vendor_thursday_end : thursdayTime.length > 0 ? thursdayTime.indexOf(',') != -1? thursdayTime.split(',')[0].split('-')[1].length > 0 ? moment(thursdayTime.split(',')[0].split('-')[1], ['hh:mm A']).format('hh:mm A') : '' : thursdayTime.split('-')[1].length > 0 ? moment(thursdayTime.split('-')[1], ['hh:mm A']).format('hh:mm A') : '' : '',
            vendor_thursday_second : thursdayTime.indexOf(',') != -1?true : false,
            vendor_thursday_second_start : thursdayTime.length > 0 ? thursdayTime.indexOf(',') != -1? thursdayTime.split(',')[1].split('-')[0].length > 0 ? moment(thursdayTime.split(',')[1].split('-')[0], ['hh:mm A']).format('hh:mm A') : '' : '' : '',
            vendor_thursday_second_end : thursdayTime.length > 0 ? thursdayTime.indexOf(',') != -1? thursdayTime.split(',')[1].split('-')[1].length > 0 ? moment(thursdayTime.split(',')[1].split('-')[1], ['hh:mm A']).format('hh:mm A') : '' : '' : '',

            vendor_friday_start : fridayTime.length > 0 ? fridayTime.indexOf(',') != -1? fridayTime.split(',')[0].split('-')[0].length > 0 ? moment(fridayTime.split(',')[0].split('-')[0], ['hh:mm A']).format('hh:mm A') : '' : fridayTime.split('-')[0].length > 0 ? moment(fridayTime.split('-')[0], ['hh:mm A']).format('hh:mm A') : '' : '',
            vendor_friday_end : fridayTime.length > 0 ? fridayTime.indexOf(',') != -1? fridayTime.split(',')[0].split('-')[1].length > 0 ? moment(fridayTime.split(',')[0].split('-')[1], ['hh:mm A']).format('hh:mm A') : '' : fridayTime.split('-')[1].length > 0 ? moment(fridayTime.split('-')[1], ['hh:mm A']).format('hh:mm A') : '' : '',
            vendor_friday_second : fridayTime.indexOf(',') != -1?true:false,
            vendor_friday_second_start : fridayTime.length > 0 ? fridayTime.indexOf(',') != -1? fridayTime.split(',')[1].split('-')[0].length > 0 ? moment(fridayTime.split(',')[1].split('-')[0], ['hh:mm A']).format('hh:mm A') : '' : '' : '',
            vendor_friday_second_end : fridayTime.length > 0 ? fridayTime.indexOf(',') != -1? fridayTime.split(',')[1].split('-')[1].length > 0 ? moment(fridayTime.split(',')[1].split('-')[1], ['hh:mm A']).format('hh:mm A') : '' : '' : '',

            vendor_saturday_start : saturdayTime.length > 0 ? saturdayTime.indexOf(',') != -1? saturdayTime.split(',')[0].split('-')[0].length > 0 ? moment(saturdayTime.split(',')[0].split('-')[0], ['hh:mm A']).format('hh:mm A') : '' : saturdayTime.split('-')[0].length > 0 ? moment(saturdayTime.split('-')[0], ['hh:mm A']).format('hh:mm A') : '' : '',
            vendor_saturday_end : saturdayTime.length > 0 ? saturdayTime.indexOf(',') != -1? saturdayTime.split(',')[0].split('-')[1].length > 0 ? moment(saturdayTime.split(',')[0].split('-')[1], ['hh:mm A']).format('hh:mm A') : '' : saturdayTime.split('-')[1].length > 0 ? moment(saturdayTime.split('-')[1], ['hh:mm A']).format('hh:mm A') : '' : '',
            vendor_saturday_second : saturdayTime.indexOf(',') != -1?true :false,
            vendor_saturday_second_start : saturdayTime.length > 0 ? saturdayTime.indexOf(',') != -1? saturdayTime.split(',')[1].split('-')[0].length > 0 ? moment(saturdayTime.split(',')[1].split('-')[0], ['hh:mm A']).format('hh:mm A'):'' : '' : '',
            vendor_saturday_second_end : saturdayTime.length > 0 ? saturdayTime.indexOf(',') != -1? saturdayTime.split(',')[1].split('-')[1].length > 0 ? moment(saturdayTime.split(',')[1].split('-')[1], ['hh:mm A']).format('hh:mm A') : '' : '' : '',

            vendor_sunday_start : sundayTime.length > 0 ? sundayTime.indexOf(',') != -1? sundayTime.split(',')[0].split('-')[0].length > 0 ? moment(sundayTime.split(',')[0].split('-')[0], ['hh:mm A']).format('hh:mm A') : '' : sundayTime.split('-')[0].length > 0 ? moment(sundayTime.split('-')[0], ['hh:mm A']).format('hh:mm A') : '' : '',
            vendor_sunday_end : sundayTime.length > 0 ? sundayTime.indexOf(',') != -1? sundayTime.split(',')[0].split('-')[1].length > 0 ? moment(sundayTime.split(',')[0].split('-')[1], ['hh:mm A']).format('hh:mm A') : '' : sundayTime.split('-')[1].length > 0 ? moment(sundayTime.split('-')[1], ['hh:mm A']).format('hh:mm A') : '' : '',
            vendor_sunday_second : sundayTime.indexOf(',') != -1?true : false,
            vendor_sunday_second_start : sundayTime.length > 0 ? sundayTime.indexOf(',') != -1? sundayTime.split(',')[1].split('-')[0].length > 0 ? moment(sundayTime.split(',')[1].split('-')[0], ['hh:mm A']).format('hh:mm A') : '' : '' : '',
            vendor_sunday_second_end : sundayTime.length > 0 ? sundayTime.indexOf(',') != -1? sundayTime.split(',')[1].split('-')[1].length > 0 ? moment(sundayTime.split(',')[1].split('-')[1], ['hh:mm A']).format('hh:mm A') : '' : '' : ''
        }
    }

    componentDidMount() {
        console.log(this.state.vendor_monday_start, this.state.vendor_monday_end)
    }

    saveFunc = () => {
        let sunday = ''
        let monday = ''
        let tuesday = ''
        let wednesday = ''
        let thursday = ''
        let friday = ''
        let saturday = ''

        sunday = this.state.vendor_sunday_start + "-" + this.state.vendor_sunday_end
        monday = this.state.vendor_monday_start + "-" + this.state.vendor_monday_end
        tuesday = this.state.vendor_tuesday_start + "-" + this.state.vendor_tuesday_end
        wednesday = this.state.vendor_wednesday_start + "-" + this.state.vendor_wednesday_end
        thursday = this.state.vendor_thursday_start + "-" + this.state.vendor_thursday_end
        friday = this.state.vendor_friday_start + "-" + this.state.vendor_friday_end
        saturday = this.state.vendor_saturday_start + "-" + this.state.vendor_saturday_end

        if(this.state.vendor_monday_second)
        {
            if(this.state.vendor_monday_second_start.length == 0 ||
                this.state.vendor_monday_second_end.length == 0)
            {
                Alert.alert('Alert', "Please fill out all field")
                return
            }
            else{
                monday += "," + this.state.vendor_monday_second_start + '-' + this.state.vendor_monday_second_end
            }
        }
        if(this.state.vendor_tuesday_second)
        {
            if(this.state.vendor_tuesday_second_start.length == 0 ||
                this.state.vendor_tuesday_second_end.length == 0)
            {
                Alert.alert('Alert', "Please fill out all field")
                return
            }
            else{
                tuesday += "," + this.state.vendor_tuesday_second_start + '-' + this.state.vendor_tuesday_second_end
            }
        }
        if(this.state.vendor_wednesday_second)
        {
            if(this.state.vendor_wednesday_second_start.length == 0 ||
                this.state.vendor_wednesday_second_end.length == 0)
            {
                Alert.alert('Alert', "Please fill out all field")
                return
            }
            else{
                wednesday += "," + this.state.vendor_wednesday_second_start + '-' + this.state.vendor_wednesday_second_end
            }
        }   
        if(this.state.vendor_thursday_second)
        {
            if(this.state.vendor_thursday_second_start.length == 0 ||
                this.state.vendor_thursday_second_end.length == 0)
            {
                Alert.alert('Alert', "Please fill out all field")
                return
            }
            else{
                thursday += "," + this.state.vendor_thursday_second_start + '-' + this.state.vendor_thursday_second_end
            }
        }
        if(this.state.vendor_friday_second)
        {
            if(this.state.vendor_friday_second_start.length == 0 ||
                this.state.vendor_friday_second_end.length == 0)
            {
                Alert.alert('Alert', "Please fill out all field")
                return
            }
            else{
                friday += "," + this.state.vendor_friday_second_start + '-' + this.state.vendor_friday_second_end
            }
        }
        if(this.state.vendor_saturday_second)
        {
            if(this.state.vendor_saturday_second_start.length == 0 ||
                this.state.vendor_saturday_second_end.length == 0)
            {
                Alert.alert('Alert', "Please fill out all field")
                return
            }
            else{
                saturday += "," + this.state.vendor_saturday_second_start + '-' + this.state.vendor_saturday_second_end
            }
        }
        if(this.state.vendor_sunday_second)
        {
            if(this.state.vendor_sunday_second_start.length == 0 ||
                this.state.vendor_sunday_second_end.length == 0)
            {
                Alert.alert('Alert', "Please fill out all field")
                return
            }
            else{
                sunday += "," + this.state.vendor_sunday_second_start + '-' + this.state.vendor_sunday_second_end
            }
        }
        this.updateVendor(sunday.replace(/\s+/g, ""), monday.replace(/\s+/g, ""), tuesday.replace(/\s+/g, ""), wednesday.replace(/\s+/g, ""), thursday.replace(/\s+/g, ""), friday.replace(/\s+/g, ""), saturday.replace(/\s+/g, ""))
    }

    updateVendor = (sunday, monday, tuesday, wednesday, thursday, friday, saturday) => {
        console.log('monday',monday)
        this.setState({ loading: true }, async () => {
            let formData = new FormData();
            formData.append('userID', this.props.auth.userID);
            formData.append('hours_sunday', sunday);
            formData.append('hours_monday', monday == '-'?'' : monday);
            formData.append('hours_tuesday', tuesday == '-'? '' : tuesday);
            formData.append('hours_wednesday', wednesday == '-' ? '' : wednesday);
            formData.append('hours_thursday', thursday == '-' ? '' : thursday);
            formData.append('hours_friday', friday == '-' ? '' : friday);
            formData.append('hours_saturday', saturday == '-' ? '' : saturday);

            this.authService.updateVendor(formData, async (res) => {
                this.setState({ loading: false }, () => {
                    this.props.route.params.refresh()
                    this.props.navigation.goBack();
                })
            });
        });
    }

    updateState = (key, value) => {
        this.setState({
            [key]: value,
        });
    };

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                        <View style={styles.container}>
                            <BackButton navigation={this.props.navigation} />
                            <Header title={this.props.route.params.title} />

                            <HoursItem
                                day="Monday"
                                updateFunc = {this.updateState}
                                start_val = {this.state.vendor_monday_start}
                                end_val = {this.state.vendor_monday_end}
                                startSecond_val = {this.state.vendor_monday_second_start}
                                endSecond_val = {this.state.vendor_monday_second_end}
                                second_val = {this.state.vendor_monday_second}
                                start = "vendor_monday_start"
                                end = "vendor_monday_end"
                                startSecond = "vendor_monday_second_start"
                                endSecond = "vendor_monday_second_end"
                                second= "vendor_monday_second"/>
                            <HoursItem
                                day="Tuesday"
                                updateFunc = {this.updateState}
                                start_val = {this.state.vendor_tuesday_start}
                                end_val = {this.state.vendor_tuesday_end}
                                startSecond_val = {this.state.vendor_tuesday_second_start}
                                endSecond_val = {this.state.vendor_tuesday_second_end}
                                second_val = {this.state.vendor_tuesday_second}
                                start = "vendor_tuesday_start"
                                end = "vendor_tuesday_end"
                                startSecond = "vendor_tuesday_second_start"
                                endSecond = "vendor_tuesday_second_end"
                                second= "vendor_tuesday_second" />
                            <HoursItem
                                day="Wednesday"
                                updateFunc = {this.updateState}
                                start_val = {this.state.vendor_wednesday_start}
                                end_val = {this.state.vendor_wednesday_end}
                                startSecond_val = {this.state.vendor_wednesday_second_start}
                                endSecond_val = {this.state.vendor_wednesday_second_end}
                                second_val = {this.state.vendor_wednesday_second}
                                start = "vendor_wednesday_start"
                                end = "vendor_wednesday_end"
                                startSecond = "vendor_wednesday_second_start"
                                endSecond = "vendor_wednesday_second_end"
                                second= "vendor_wednesday_second" />
                            <HoursItem
                                day="Thursday"
                                updateFunc = {this.updateState}
                                start_val = {this.state.vendor_thursday_start}
                                end_val = {this.state.vendor_thursday_end}
                                startSecond_val = {this.state.vendor_thursday_second_start}
                                endSecond_val = {this.state.vendor_thursday_second_end}
                                second_val = {this.state.vendor_thursday_second}
                                start = "vendor_thursday_start"
                                end = "vendor_thursday_end"
                                startSecond = "vendor_thursday_second_start"
                                endSecond = "vendor_thursday_second_end"
                                second= "vendor_thursday_second" />
                            <HoursItem
                                day="Friday"
                                updateFunc = {this.updateState}
                                start_val = {this.state.vendor_friday_start}
                                end_val = {this.state.vendor_friday_end}
                                startSecond_val = {this.state.vendor_friday_second_start}
                                endSecond_val = {this.state.vendor_friday_second_end}
                                second_val = {this.state.vendor_friday_second}
                                start = "vendor_friday_start"
                                end = "vendor_friday_end"
                                startSecond = "vendor_friday_second_start"
                                endSecond = "vendor_friday_second_end"
                                second= "vendor_friday_second" />
                            <HoursItem
                                day="Saturday"
                                updateFunc = {this.updateState}
                                start_val = {this.state.vendor_saturday_start}
                                end_val = {this.state.vendor_saturday_end}
                                startSecond_val = {this.state.vendor_saturday_second_start}
                                endSecond_val = {this.state.vendor_saturday_second_end}
                                second_val = {this.state.vendor_saturday_second}
                                start = "vendor_saturday_start"
                                end = "vendor_saturday_end"
                                startSecond = "vendor_saturday_second_start"
                                endSecond = "vendor_saturday_second_end"
                                second= "vendor_saturday_second" />
                            <HoursItem
                                day="Sunday"
                                updateFunc = {this.updateState}
                                start_val = {this.state.vendor_sunday_start}
                                end_val = {this.state.vendor_sunday_end}
                                startSecond_val = {this.state.vendor_sunday_second_start}
                                endSecond_val = {this.state.vendor_sunday_second_end}
                                second_val = {this.state.vendor_sunday_second}
                                start = "vendor_sunday_start"
                                end = "vendor_sunday_end"
                                startSecond = "vendor_sunday_second_start"
                                endSecond = "vendor_sunday_second_end"
                                second= "vendor_sunday_second" />

                            <View style={{ marginTop : 20 }}>
                                <Button 
                                    blue={true} 
                                    loading={this.state.loading}
                                    title="SAVE" 
                                    func={this.saveFunc} />
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

export default connect(mapStateToProps, null)(VendorHours);