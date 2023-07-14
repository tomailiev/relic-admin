import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Navigate } from "react-router-dom";

const LoggedOut = ({ component }) => {
    const { currentUser } = useContext(UserContext);

    return (
        <>
        {
            !currentUser
                ? <> {component} </>
                : <Navigate to={'/'} />
        }
        </>
    );
};

export default LoggedOut;