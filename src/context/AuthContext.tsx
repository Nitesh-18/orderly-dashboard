import React, { createContext, useState, useContext, useEffect } from 'react';
import { account } from '../utils/appwrite';

interface AuthContextType {
    user: any;
    loginWithGoogle: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(null);

    const loginWithGoogle = async () => {
        try {
            await account.createOAuth2Session('google', 'http://localhost:5173');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await account.get();
                setUser(user);
            } catch {
                setUser(null);
            }
        };
        
        fetchUser();
    }, []);
    return (
        <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
