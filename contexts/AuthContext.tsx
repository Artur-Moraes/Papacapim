// contexts/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null); // Adicionei estado para o token

    const login = async (login, password) => {
        try {
            const response = await axios.post('https://api.papacapim.just.pro.br/sessions', {
                login,
                password,
            });
            setToken(response.data.token); 
            setUser(response.data.user_login); 

            axios.defaults.headers.common['x-session-token'] = response.data.token;

            return response.data; 
        } catch (error) {
            throw error.response.data; 
        }
    };

    const register = async (name, login, password, passwordConfirmation) => {
        try {
            const response = await axios.post('https://api.papacapim.just.pro.br/users', {
                user: {
                    login,
                    name,
                    password,
                    password_confirmation: passwordConfirmation,
                },
            });
            setUser(response.data); 
            return response.data; 
        } catch (error) {
            throw error.response.data; 
        }
    };


    const logout = () => {
        setUser(null);
        setToken(null);
        delete axios.defaults.headers.common['x-session-token']; 
    };

    return (
        <AuthContext.Provider value={{ login, register, logout, user, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
