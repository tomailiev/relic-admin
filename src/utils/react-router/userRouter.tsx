import { RouteObject } from "react-router-dom";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import UserProfile from "../../components/User/UserProfile";

const userRouter: RouteObject[] = [
    {
        path: "user",
        element: <LoggedIn />,
        children: [
            {
                index: true, // matches "/videos"
                element: <UserProfile />,
                // loader: videoLoader,
            },

        ],
    },
];

export default userRouter;
