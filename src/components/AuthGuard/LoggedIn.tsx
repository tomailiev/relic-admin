import { ReactElement, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { Navigate, useLocation } from "react-router-dom";
import LocationContext from "../../context/LocationContext";


const LoggedIn = ({ component }: { component: ReactElement }) => {

    const { currentUser } = useContext(UserContext);
    const { setLocation } = useContext(LocationContext)
    const currentLocation = useLocation();
    useEffect(() => {
        console.log(currentLocation.pathname);
        
        setLocation(currentLocation.pathname);
    }, [currentLocation.pathname, setLocation])

    return (
        <>
            {
                currentUser
                    ? <> {component} </>
                    : <Navigate to={'/login'} />
            }
        </>
    );
};

export default LoggedIn;