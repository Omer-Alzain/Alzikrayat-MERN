import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const data = await api.get('/api/auth/me');
                setUser(data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkLogin();
    }, []);

    const login = async (formData) => {
        const data = await api.post('/api/auth/login', formData);
        setUser(data.user);
        return data;
    };

    const register = async (formData) => {
        const data = await api.post('/api/auth/register', formData);
        setUser(data.user);
        return data;
    };

    const logout = async () => {
        await api.post('/api/auth/logout', {});
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
