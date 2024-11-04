import { useAuthContext } from '../context/AuthContext';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = useAuthContext();

    return isAuthenticated ? children : <Navigate to="/login" replace />
};

export default ProtectedRoute;