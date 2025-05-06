import { ReactElement, useContext } from "react";
import UserContext from "../../context/UserContext";
import { Navigate } from "react-router-dom";


const LoggedIn = ({ component }: {component: ReactElement}) => {
    
    const { currentUser } = useContext(UserContext);

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