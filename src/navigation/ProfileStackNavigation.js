import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from '../screens/user/account/home';
import Profile from '../screens/user/account/profile';
import Payment from '../screens/user/account/payment';
import Addresses from '../screens/user/account/addresses';
import AddAddresses from '../screens/user/account/addresses/addAddress';
import Support from '../screens/user/account/support';
import Reward from '../screens/user/account/reward';
import PromoCodes from '../screens/user/account/promoCodes';
import BecomeADriver from '../screens/user/account/becomeADriver';
import BecomeAVendor from '../screens/user/account/becomeAVendor';
import DriverHome from '../screens/user/account/driver/home';
import DriverVehicles from '../screens/user/account/driver/vehicles';
import DriverHours from '../screens/user/account/driver/hours';
import DriverQueues from '../screens/user/account/driver/queues';
import DriverThanks from '../screens/user/account/becomeADriver/thanks';
import VendorHome from '../screens/user/account/vendor/home';
import VendorItems from '../screens/user/account/vendor/items';
import VendorAddItems from '../screens/user/account/vendor/items/addItem';
import VendorModifier from '../screens/user/account/vendor/modifier';
import VendorAddModifier from '../screens/user/account/vendor/modifier/addModifier';
import VendorHours from '../screens/user/account/vendor/hours';
import VendorDescription from '../screens/user/account/vendor/description';
import VendorWebsite from '../screens/user/account/vendor/website';

function ProfileStackNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Addresses" component={Addresses} />
            <Stack.Screen name="AddAddresses" component={AddAddresses} />
            <Stack.Screen name="Support" component={Support} />
            <Stack.Screen name="Reward" component={Reward} />
            <Stack.Screen name="VendorHome" component={VendorHome} />
            <Stack.Screen name="VendorItems" component={VendorItems} />
            <Stack.Screen name="VendorAddItems" component={VendorAddItems} />
            <Stack.Screen name="VendorModifier" component={VendorModifier} />
            <Stack.Screen name="VendorAddModifier" component={VendorAddModifier} />
            <Stack.Screen name="VendorHours" component={VendorHours} />
            <Stack.Screen name="VendorDescription" component={VendorDescription} />
            <Stack.Screen name="VendorWebsite" component={VendorWebsite} />
            <Stack.Screen name="PromoCodes" component={PromoCodes} />
            <Stack.Screen name="BecomeADriver" component={BecomeADriver} />
            <Stack.Screen name="BecomeAVendor" component={BecomeAVendor} />
            <Stack.Screen name="DriverHome" component={DriverHome} />
            <Stack.Screen name="DriverVehicles" component={DriverVehicles} />
            <Stack.Screen name="DriverHours" component={DriverHours} />
            <Stack.Screen name="DriverQueues" component={DriverQueues} />
            <Stack.Screen name="DriverThanks" component={DriverThanks} />
        </Stack.Navigator>
    );
}

export default ProfileStackNavigation;