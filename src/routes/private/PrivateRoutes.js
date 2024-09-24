import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image } from 'react-native';
import TabNavigator from './TabNavigator';
import UserProfileScreen from '../../screens/UserProfileScreen';

const Stack = createStackNavigator();

export default function PrivateRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="TabNavigator" 
                component={TabNavigator} 
                options={{
                    headerTitle: () => (
                        <Image 
                            source={require('../../images/papas.png')} 
                            style={{ width: 100, height: 40 }} 
                            resizeMode="contain"
                        />
                    ),
                    headerTitleAlign: 'center', 
                }}
            />
            <Stack.Screen 
                name="UserProfileScreen" 
                component={UserProfileScreen} 
                options={{ title: 'Perfil do Usuário' }} 
            />
        </Stack.Navigator>
    );
}
