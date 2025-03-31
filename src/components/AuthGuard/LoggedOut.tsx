import { ReactElement, useContext } from "react";
import UserContext from "../../context/UserContext";
import { Navigate } from "react-router-dom";

type LoggedOutProps = {
    component: ReactElement
}

const LoggedOut = ({ component }: LoggedOutProps): ReactElement => {
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