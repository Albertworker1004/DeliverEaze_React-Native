import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Welcome from '../screens/auth/welcome';
import SignUp from '../screens/auth/signUp';
import SignIn from '../screens/auth/signIn';
import ForgotPassword from '../screens/auth/forgotPassword';
import ConfirmCode from '../screens/auth/confirmCode';
import ChangePassword from '../screens/auth/changePassword';
import AddPayment from '../screens/auth/addPayment';

function AuthNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ConfirmCode" component={ConfirmCode} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="AddPayment" component={AddPayment} />
        </Stack.Navigator>
    );
}

export default AuthNavigation;