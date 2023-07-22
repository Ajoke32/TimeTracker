import { useTypedSelector } from '../../hooks';
import { Navigate } from 'react-router-dom';


interface ProtectedRouteProps {
    permission: number,
    component: JSX.Element
}

export const ProtectedRoute = ({ permission, component }: ProtectedRouteProps) => {
    const state = useTypedSelector((state) => state.auth);

    return ((state.user!.permissions & permission) ?
        component : <Navigate to='/'/>
    );
}