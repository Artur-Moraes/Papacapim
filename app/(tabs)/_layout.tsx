// app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';

const Layout = () => (
  <AuthProvider>
    <Stack>
      <Stack.Screen name="loginScreen" />
      <Stack.Screen name="signUpScreen" />
      <Stack.Screen name="Feed" />
      <Stack.Screen name="editUser" />
      <Stack.Screen name="deleteAccount" />
      <Stack.Screen name="searchUser" />
      <Stack.Screen name="otherUser" />
    </Stack>
  </AuthProvider>
);

export default Layout;
