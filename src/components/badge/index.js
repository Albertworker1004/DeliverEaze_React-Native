import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

class Badge extends React.Component {
    render() {
        return (
            <View style={styles.circleBadge}>
                <Text style={styles.badgeCount}>{this.props.count && this.props.count}</Text>
            </View>
        );
    }
}

export default Badge;