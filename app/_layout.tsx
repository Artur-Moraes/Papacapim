import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { Stack } from 'expo-router';

const Layout: React.FC = () => {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
};

export default Layout;
