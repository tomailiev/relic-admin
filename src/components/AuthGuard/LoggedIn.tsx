import { ReactElement, useContext } from "react";
import UserContext from "../../context/UserContext";
import { Navigate } from "react-router-dom";

type LoggedInProps = {
    component: ReactElement
}
const LoggedIn = ({ component }: LoggedInProps) => {
    
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