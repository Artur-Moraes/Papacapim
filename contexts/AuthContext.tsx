import { createContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void; 
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  setToken: () => {},
  clearToken: () => {}, 
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Failed to load token', error);
      }
    };

    loadToken();
  }, []);

  const saveToken = async (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      await AsyncStorage.setItem('token', newToken); 
    } else {
      await AsyncStorage.removeItem('token'); 
    }
  };

  const clearToken = async () => {
    setToken(null);
    await AsyncStorage.removeItem('token'); 
  };

  return (
    <AuthContext.Provider value={{ token, setToken: saveToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
}
