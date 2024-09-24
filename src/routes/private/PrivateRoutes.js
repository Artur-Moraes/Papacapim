import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import TabNavigator from './TabNavigator';
import UserProfileScreen from '../../screens/UserProfileScreen';
const Stack = createStackNavigator();

export default function PrivateRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Papacapim" component={TabNavigator} />
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
        </Stack.Navigator>
    )
}
