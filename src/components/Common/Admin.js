import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Navigate } from "react-router-dom";

const Admin = ({ component }) => {
    const { currentUser } = useContext(UserContext);

    return (
        <>
            {
                currentUser && currentUser.uid === 'O7QvZktadtgcOuLZ2KqKGEAaRaF3'
                    ? <> {component} </>
                    : currentUser
                        ? <Navigate to={-1} />
                        : <Navigate to={'/login'} />
            }
        </>
    );
};

export default Admin;