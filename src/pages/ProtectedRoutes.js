import { Outlet, Navigate } from "react-router-dom";
import Login from './Login';
import { useContext } from "react";
import { useLocation } from "react-router-dom";

const useAuth = () => {
    const user = {loggedIn: false};
    return user && user.loggedIn; 
}

const ProtectedRoutes = () => {
    const location = useLocation();
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to = "/Home" replace state={{from: location}}/>;
}

export default ProtectedRoutes;