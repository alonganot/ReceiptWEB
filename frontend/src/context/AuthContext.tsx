// AuthContext.js
import { createContext, useContext, ReactNode } from 'react';
import { useUserContext } from './UserContext';
import { GoogleApiDTO } from '../types/GoogleApiDTO';

interface iAuthContext {
    isAuthenticated: () => boolean,
    login: (jwt: string) => void,
    logout: () => void
}
const AuthContext = createContext<iAuthContext | null>(null);

export const useAuthContext = () => useContext(AuthContext) as iAuthContext

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { setUser, clearUser, isUserPresent } = useUserContext()

    const isAuthenticated = () => {
        if (!isUserPresent()) {
            const jwt = localStorage.getItem("jwt")

            if (!jwt || jwt.length === 0) {                
                return false
            } else {                
                const { exp } = JSON.parse(atob(jwt!.split('.')[1])) as GoogleApiDTO
                if (new Date(exp * 1000) < new Date()) {                    
                    console.log("jwt expired bro");
                    localStorage.setItem("jwt", "")

                    return false
                }                
            }

        }

        return true
    }

    const login = (jwt: string) => {   
        const { email, name, picture } = JSON.parse(atob(jwt!.split('.')[1])) as GoogleApiDTO
        setUser({id: email, nickname: name, picture})
    };

    const logout = () => {
        clearUser();
        localStorage.setItem("jwt", "")
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};