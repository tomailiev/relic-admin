import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const LoggedIn = () => {
    const { currentUser } = useContext(UserContext);
    const currentLocation = useLocation();

    if (!currentUser) {
        return <Navigate to={`/login?redirectTo=${currentLocation.pathname}`} replace />;
    }

    return <Outlet />;
};

export default LoggedIn;
