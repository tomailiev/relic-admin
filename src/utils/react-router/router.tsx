import Home from '../../components/Home/Home';
import ErrorPage from '../../components/Common/ErrorPage';
import Index from '../../components/Index/Index';
import LogIn from '../../components/LogIn/LogIn';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Register from '../../components/Register/Register';
import VerifyReset from '../../components/VerifyReset/VerifyReset';
import signInAction from '../../actions/user/signInAction';
import registerAction from '../../actions/user/registerAction';
import signOutAction from '../../actions/user/signOutAction';
import verifyResetAction from '../../actions/user/verifyResetAction';
import FetchError from '../../components/Common/FetchError';
import videoRouter from './videoRouter';
import musicianRouter from './musicianRouter';
import textRouter from './textRouter';
import eventRouter from './eventRouter';
import donorRouter from './donorRouter';
import grantRouter from './grantRouter';
import LoggedOut from '../../components/AuthGuard/LoggedOut';
import csvRouter from './csvRouter';
import subscriberRouter from './subscriberRouter';
import campaignRouter from './campaignRouter';
import listRouter from './listRouter';
import photoRouter from './photoRouter';

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        element: <LoggedOut />, // guard wrapper
        children: [
          {
            path: "login",
            element: <LogIn />,
            action: signInAction,
          },
          {
            path: "register",
            element: <Register />,
            action: registerAction,
          },
          {
            path: "verify",
            element: <VerifyReset />,
            action: verifyResetAction,
          },
          {
            path: "reset",
            element: <VerifyReset />,
            action: verifyResetAction,
          },
        ],
      },
      {
        path: "logout",
        element: <FetchError />,
        action: signOutAction,
      },
      ...videoRouter,
      ...musicianRouter,
      ...textRouter,
      ...eventRouter,
      ...donorRouter,
      ...grantRouter,
      ...csvRouter,
      ...subscriberRouter,
      ...campaignRouter,
      ...listRouter,
      ...photoRouter
    ]
  }
]

const router = createBrowserRouter(routes);


export default router;