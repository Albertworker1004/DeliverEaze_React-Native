import * as React from 'react';
//import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

//import styles from './styles/tabNavigator';

const Tab = createBottomTabNavigator();

import Home from './HomeTabStack';

import Calendar from './CalendarStackNavigation';
import Orders from './OrderStackNavigation';
import Search from './SearchStackNavigation';
import Profile from './ProfileStackNavigation';
//import Notification from './NotificationStackNavigation';
//import ShoppingCart from './ShoppingCartStackNavigation';
//import Favorites from './FavoritesStackNavigation';
//import Profile from './ProfileStackNavigation';

/* function MyTabBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <View style={styles.container}>
            {
                state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityStates={isFocused ? ['selected'] : []}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.button}
                        >
                            {label === "Home" ?
                                <FontAwesome name="home" size={25} color={isFocused ? "#97615f" : "#5c6b68"} /> :
                                label === "Notification" ?
                                    <FontAwesome name="bell" size={22} color={isFocused ? "#97615f" : "#5c6b68"} /> :
                                    label === "ShoppingCart" ?
                                        <FontAwesome name="shopping-cart" size={24} color={isFocused ? "#97615f" : "#5c6b68"} /> :
                                        label === "Favorites" ?
                                            <FontAwesome name="heart" size={23} color={isFocused ? "#97615f" : "#5c6b68"} /> :
                                            <FontAwesome name="user" size={24} color={isFocused ? "#97615f" : "#5c6b68"} />

                            }
                        </TouchableOpacity>
                    );

                })
            }
        </View >
    );
} */
/* 
function getTabBarVisible(route) {
    const routeName = route.state
        ? route.state.routes[route.state.index].name
        : route.params?.screen || 'Home';

    if (routeName === 'PastOrders') {
        return false;
    }
    if (routeName === 'Message') {
        return false;
    }
    if (routeName === 'SingleOrder') {
        return false;
    }
    return true;
} */

export default function App() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#1A2D5A',
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <SimpleLineIcons name="home" color={color} size={20} />
                    ),
                }} />
            <Tab.Screen
                name="Calendar"
                component={Calendar}
                options={{
                    tabBarLabel: 'Calendar',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="calendar" color={color} size={size} />
                    ),
                }} />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, size }) => (
                        <Fontisto name="search" color={color} size={size} />
                    ),
                }} />
            <Tab.Screen
                name="Orders"
                component={Orders}
                options={{
                    tabBarLabel: 'Orders',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="ticket" color={color} size={size} />
                    ),
                }} />
            <Tab.Screen
                name="Account"
                component={Profile}
                options={({ route }) => ({
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="user" color={color} size={size} />
                    ),
                    tabBarVisible: route.state && route.state.index === 0
                })} />
            {/* <Tab.Screen
                name="Notification"
                component={Home}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisible(route)
                })}
            /> */}
            {/* <Tab.Screen
                name="ShoppingCart"
                component={Home}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisible(route)
                })}
            />
            <Tab.Screen name="Favorites" component={Home} />
            <Tab.Screen
                name="Home"
                component={Profile}
                options={({ route }) => ({
                    tabBarVisible: route.state && route.state.index === 0
                })} /> */}
        </Tab.Navigator>
    );
}