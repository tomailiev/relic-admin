import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";

const LoggedOut = () => {
  const { currentUser } = useContext(UserContext);
  const [searchParams] = useSearchParams();

  if (currentUser) {
    return <Navigate to={searchParams.get("redirectTo") || "/"} />;
  }

  return <Outlet />;
};

export default LoggedOut;