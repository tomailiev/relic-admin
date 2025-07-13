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
    errorElement: <ErrorPage />, children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: 'login',
        element: <LoggedOut component={< LogIn />} />,
        action: signInAction
      },
      {
        path: 'register',
        element: <LoggedOut component={
          <Register />} />,
        action: registerAction
      },
      {
        path: 'logout',
        element: <FetchError />,
        action: signOutAction
      },
      {
        path: 'verify',
        element: <LoggedOut component={
          <VerifyReset />} />,
        action: verifyResetAction
      },
      {
        path: 'reset',
        element: <LoggedOut component={
          <VerifyReset />} />,
        action: verifyResetAction
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