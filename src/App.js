// import logo from './logo.svg';
import { CssBaseline } from '@mui/material';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import ErrorPage from './components/Common/ErrorPage';
import Videos from './components/Videos/Videos';
import videoLoader from './components/Videos/loader';
import Musicians from './components/Musicians/Musicians';
import musicianLoader from './components/Musicians/loader';
import Texts from './components/Texts/Texts';
import textLoader from './components/Texts/loader';
import Events from './components/Events/Events';
import eventLoader from './components/Events/loader';
import textAction from './components/Texts/action';
import videoAction from './components/Videos/action';
import musicianAction from './components/Musicians/action';
import eventAction from './components/Events/action';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase/firebase-init';
import UserContext from './context/UserContext';
import Index from './components/Index/Index';
import LogIn from './components/LogIn/LogIn';
import signInAction from './components/LogIn/action';
import signOutAction from './components/LogOut/action';
import LoggedIn from './components/Common/LoggedIn';
import LoggedOut from './components/Common/LoggedOut';

const router = createBrowserRouter([
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
        path: 'videos',
        element: <LoggedIn component={<Videos />} />,
        loader: videoLoader,
        action: videoAction
      },
      {
        path: 'texts',
        element: <LoggedIn component={<Texts />} />,
        loader: textLoader,
        action: textAction
      },
      {
        path: 'musicians',
        element: <LoggedIn component={<Musicians />} />,
        loader: musicianLoader,
        action: musicianAction
      },
      {
        path: 'events',
        element: <LoggedIn component={<Events />} />,
        loader: eventLoader,
        action: eventAction
      },
      {
        path: 'login',
        element: <LoggedOut component={<LogIn />} />,
        action: signInAction
      },
      {
        path: 'logout',
        action: signOutAction
      }
    ]
  },
]);


function App() {

  const [currentUser, setCurrentUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  })


  return (
    <CssBaseline>
      <UserContext.Provider value={{ currentUser, setCurrentUser }} >
        <RouterProvider router={router} />
      </UserContext.Provider>
    </CssBaseline>
  );
}

export default App;
