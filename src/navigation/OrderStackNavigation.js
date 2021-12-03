import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from '../screens/user/orders/home';
import OrderStatus from '../screens/user/orders/orderStatus';

function OrderStackNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="OrderStatus" component={OrderStatus} />
        </Stack.Navigator>
    );
}

export default OrderStackNavigation;