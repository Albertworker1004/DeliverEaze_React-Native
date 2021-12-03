import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Auth from './AuthNavigation';
import Tab from './TabNavigation';

function MainNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="Tab" component={Tab} />
        </Stack.Navigator>
    );
}

export default MainNavigation;