import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';

export default class BecomeADriverPicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fromVisible: false,
            toVisible: false,
            from: new Date("2020-08-14T09:47:10.842Z"),
            to: new Date("2020-08-14T10:47:10.842Z"),
        }
    }

    parseTime = time => {
        let zone;
        let hours = time.getHours();
        let minutes = time.getMinutes();

        if (time.getHours() > 11) {
            zone = "PM";
            hours = hours - 12
        }
        else
            zone = "AM";
        return hours + ":" + minutes + " " + zone;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.dayText}>{this.props.day}</Text>
                <View style={styles.rowContainer}>
                    <TouchableOpacity
                        onPress={() => this.setState({ fromVisible: true })}
                        style={styles.timeContainer}>
                        <Text style={[styles.greyText, { fontSize: 14 }]}>{this.parseTime(this.state.from)}</Text>
                        <Entypo name="chevron-thin-down" size={11} color={"#9B9B9B"} />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity
                        onPress={() => this.setState({ toVisible: true })}
                        style={styles.timeContainer}>
                        <Text style={[styles.greyText, { fontSize: 14 }]}>{this.parseTime(this.state.to)}</Text>
                        <Entypo name="chevron-thin-down" size={11} color={"#9B9B9B"} />
                    </TouchableOpacity>
                </View>

                <DateTimePickerModal
                    date={this.state.from}
                    isVisible={this.state.fromVisible}
                    mode="time"
                    onConfirm={from => this.setState({ from: from, fromVisible: false })}
                    onCancel={() => this.setState({ fromVisible: false })}
                />

                <DateTimePickerModal
                    date={this.state.to}
                    isVisible={this.state.toVisible}
                    mode="time"
                    onConfirm={to => this.setState({ to: to, toVisible: false })}
                    onCancel={() => this.setState({ toVisible: false })}
                />
            </View>
        );
    }
}