import React from 'react';
import { Text } from 'react-native';

import styles from './styles';

export default class HeaderText extends React.Component {

    render() {
        return (
            <Text style={styles.text}>{this.props.title}</Text>
        );
    }
}