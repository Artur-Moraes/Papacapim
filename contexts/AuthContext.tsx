// contexts/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const api = 'https://api.papacapim.just.pro.br';

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${api}/login`, {
                username,
                password,
            });
            setUser(response.data);
        } catch (error) {
            console.error('Login error:', error.response.data); // Adicione log para depuração
            throw new Error('Erro ao fazer login');
        }
    };

    const register = async (name, username, password) => {
        try {
            const response = await axios.post(`${api}/register`, {
                name,
                username,
                password,
            });
            setUser(response.data);
        } catch (error) {
            console.error('Registration error:', error.response.data); // Adicione log para depuração
            throw new Error('Erro ao cadastrar. Verifique os dados.');
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
