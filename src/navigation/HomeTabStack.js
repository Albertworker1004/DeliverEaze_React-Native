import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from '../screens/user/home/home';
import RestaurantDetails from '../screens/user/home/restaurantDetails';
import RestaurantItem from '../screens/user/home/restaurantItem';
import ShoppingCart from '../screens/user/home/shoppingCart';
import Payment from '../screens/user/home/payment';
import Success from '../screens/user/home/success';
import NotifyMe from '../screens/user/home/notifyMe';

function HomeTabStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
            <Stack.Screen name="RestaurantItem" component={RestaurantItem} />
            <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Success" component={Success} />
            <Stack.Screen name="NotifyMe" component={NotifyMe} />
        </Stack.Navigator>
    );
}

export default HomeTabStack;