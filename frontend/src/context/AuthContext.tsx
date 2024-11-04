// AuthContext.js
import { createContext, useState, useContext, ReactNode } from 'react';
import { useUserContext } from './UserContext';
import { User } from '../types/User';

interface iAuthContext {
    isAuthenticated: boolean,
    login: (user: User) => void,
    logout: () => void
}
const AuthContext = createContext<iAuthContext | null>(null);

export const useAuthContext = () => useContext(AuthContext) as iAuthContext

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { setUser, clearUser } = useUserContext()
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (loggedInUser: User) => {   
        setUser(loggedInUser)
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
        clearUser();
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};