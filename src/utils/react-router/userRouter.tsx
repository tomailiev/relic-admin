import { RouteObject } from "react-router-dom";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import UserProfile from "../../components/User/UserProfile";
import updateProfileAction from "../../actions/user/updateProfileAction";

const userRouter: RouteObject[] = [
    {
        path: "user",
        element: <LoggedIn />,
        children: [
            {
                index: true,
                element: <UserProfile />,
                // loader: videoLoader,
                action: updateProfileAction
            },

        ],
    },
];

export default userRouter;
