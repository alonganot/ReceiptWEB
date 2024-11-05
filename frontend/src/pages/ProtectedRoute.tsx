import { useAuthContext } from '../context/AuthContext';
import { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = useAuthContext();
    const { login } = useAuthContext()

    useEffect(() => {
        if (isAuthenticated()) {
            login(localStorage.getItem("jwt")!)
        }
      }, [])

    return isAuthenticated() ? children : <Navigate to="/login" replace />
};

export default ProtectedRoute;