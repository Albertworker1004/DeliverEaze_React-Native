import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment'

import styles from './styles';

export default class HoursItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isMainStartTimeSelected : (this.props.start_val == '' || this.props.start_val == undefined)? false : true,
            isMainEndTimeSelected : (this.props.start_val == '' || this.props.start_val == undefined)? false : true,
            isSecondStartTimeSelected : (this.props.start_val == '' || this.props.start_val == undefined)? false : true,
            isSecondEndTimeSelected : (this.props.start_val == '' || this.props.start_val == undefined)? false : true,
            start: (this.props.start_val == '' || this.props.start_val == undefined)?'' : new Date(moment(this.props.start_val, ['hh:mm A']).toISOString()),
            startVisible: false,
            end: (this.props.end_val == '' || this.props.end_val == undefined)?'' : new Date(moment(this.props.end_val, ['hh:mm A']).toISOString()),
            endVisible: false,
            startSecond: (this.props.startSecond_val == '' || this.props.startSecond_val == undefined)?'' : new Date(moment(this.props.startSecond_val, ['hh:mm A']).toISOString()),
            startSecondVisible: false,
            endSecond: (this.props.endSecond_val == '' || this.props.endSecond_val == undefined)?'' : new Date(moment(this.props.endSecond_val, ['hh:mm A']).toISOString()),
            endSecondVisible: false,
            secondShift: this.props.second_val
        }
    }

    parseTime = time => {

        if(time == ''){
            return '_ _  :  _ _'
        }

        let zone;
        let hours = time.getHours();
        let minutes = time.getMinutes();

        if (time.getHours() > 11) {
            zone = "PM";
            hours = hours - 12
        }
        else
            zone = "AM";
        return hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + " " + zone;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.boldText}>{this.props.day}</Text>
                <View style={styles.rowContainer}>
                    <View >
                        <Text style={styles.greyText}>Start</Text>
                        <TouchableOpacity
                            onPress={() => this.setState({ startVisible: true })}
                            style={[styles.timeContainer, { marginRight: 8 }]}>
                            <Text style={[styles.greyText, { fontSize: 14 }]}>{this.state.isMainStartTimeSelected? this.parseTime(this.state.start) : "_ _  :  _ _"}</Text>
                            <Entypo name="chevron-thin-down" size={11} color={"#9B9B9B"} />
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={styles.greyText}>End</Text>
                        <TouchableOpacity
                            onPress={() => this.setState({ endVisible: true })}
                            style={styles.timeContainer}>
                            <Text style={[styles.greyText, { fontSize: 14 }]}>{this.state.isMainEndTimeSelected? this.parseTime(this.state.end) : "_ _  :  _ _"}</Text>
                            <Entypo name="chevron-thin-down" size={11} color={"#9B9B9B"} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.secondShiftButton}
                    onPress={() => {
                        this.setState({ secondShift: !this.state.secondShift }, () => {
                            this.props.updateFunc(this.props.second, this.state.secondShift);
                        })
                    }}>
                    <View style={[styles.checkBox, { backgroundColor: this.state.secondShift ? "#1A2D5A" : "#F9F9F9", borderWidth: this.state.secondShift ? 0 : 1 }]}>
                        {this.state.secondShift ?
                            <MaterialIcons name="done" size={17} color={"white"} /> : null}
                    </View>
                    <Text style={[styles.greyText, { marginLeft: 10 }]}>Second Shift</Text>
                </TouchableOpacity>
                {this.state.secondShift ?
                    <View style={styles.rowContainer}>
                        <View >
                            <Text style={styles.greyText}>Start</Text>
                            <TouchableOpacity
                                onPress={() => this.setState({ startSecondVisible: true })}
                                style={[styles.timeContainer, { marginRight: 8 }]}>
                                <Text style={[styles.greyText, { fontSize: 14 }]}>{this.state.isSecondStartTimeSelected? this.parseTime(this.state.startSecond) : "_ _  :  _ _"}</Text>
                                <Entypo name="chevron-thin-down" size={11} color={"#9B9B9B"} />
                            </TouchableOpacity>
                        </View>
                        <View >
                            <Text style={styles.greyText}>End</Text>
                            <TouchableOpacity
                                onPress={() => this.setState({ endSecondVisible: true })}
                                style={styles.timeContainer}>
                                <Text style={[styles.greyText, { fontSize: 14 }]}>{this.state.isSecondEndTimeSelected? this.parseTime(this.state.endSecond) : "_ _  :  _ _"}</Text>
                                <Entypo name="chevron-thin-down" size={11} color={"#9B9B9B"} />
                            </TouchableOpacity>
                        </View>
                    </View> : null}
                <DateTimePickerModal
                    // date={this.state.start}
                    isVisible={this.state.startVisible}
                    mode="time"
                    onConfirm={start => {
                        this.setState({ start: start, startVisible: false, isMainStartTimeSelected : true })
                        this.props.updateFunc(this.props.start, this.parseTime(start));
                    }}
                    onCancel={() => this.setState({ startVisible: false })}
                />
                <DateTimePickerModal
                    // date={this.state.end}
                    isVisible={this.state.endVisible}
                    mode="time"
                    onConfirm={end => {
                        this.setState({ end: end, endVisible: false, isMainEndTimeSelected : true })
                        this.props.updateFunc(this.props.end, this.parseTime(end));
                    }}
                    onCancel={() => this.setState({ endVisible: false })}
                />
                <DateTimePickerModal
                    // date={this.state.startSecond}
                    isVisible={this.state.startSecondVisible}
                    mode="time"
                    onConfirm={startSecond => {
                        this.setState({ startSecond: startSecond, startSecondVisible: false, isSecondStartTimeSelected : true })
                        this.props.updateFunc(this.props.startSecond, this.parseTime(startSecond));
                    }}
                    onCancel={() => this.setState({ startSecondVisible: false })}
                />
                <DateTimePickerModal
                    // date={this.state.endSecond}
                    isVisible={this.state.endSecondVisible}
                    mode="time"
                    onConfirm={endSecond => {
                        this.setState({ endSecond: endSecond, endSecondVisible: false, isSecondEndTimeSelected : true })
                        this.props.updateFunc(this.props.endSecond, this.parseTime(endSecond));
                    }}
                    onCancel={() => this.setState({ endSecondVisible: false })}
                />
            </View>
        );
    }
}