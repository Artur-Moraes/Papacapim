import { Tabs } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

export default function _layout() {
  return (
   <Tabs>
    <Tabs.Screen name='index' options={{
      tabBarIcon: ({ size, color }) => (
        <AntDesign name={"home"} size={30} color={color} />
      )
}} />
    <Tabs.Screen name='DeleteAccountScreen' options={{
      tabBarIcon: ({ size, color }) => (
        <AntDesign name={"android"} size={30} color={color} />
      )
}} />
    <Tabs.Screen name='new-tweet' options={{
      tabBarIcon: ({ size, color }) => (
        <AntDesign name={"USB"} size={30} color={color} />
      )
}} />
    <Tabs.Screen name='SearchScreen' options={{
      tabBarIcon: ({ size, color }) => (
        <AntDesign name={"HTML"} size={30} color={color} />
      )
}} />
    <Tabs.Screen name='UpdateProfileScreen' options={{
      tabBarIcon: ({ size, color }) => (
        <AntDesign name={"home"} size={30} color={color} />
      )
}} />
    <Tabs.Screen name='UserProfileScreen' options={{
      tabBarIcon: ({ size, color }) => (
        <AntDesign name={"API"} size={30} color={color} />
      )
}} />
    
   </Tabs>
  )
}