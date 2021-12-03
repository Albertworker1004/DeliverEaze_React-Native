import React from 'react';
import { TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';

export default class BackButtton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (this.props.func) {
                        this.props.navigation.goBack();
                        this.props.func();
                    }
                    else
                        this.props.navigation.goBack();
                }}
                style={styles.button}>
                <Entypo name="chevron-thin-left" size={20} color={"#1A2D5A"} />
            </TouchableOpacity>
        );
    }
}