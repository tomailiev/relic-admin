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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'videos',
        element: <Videos />,
        loader: videoLoader,
        action: videoAction
      },
      {
        path: 'texts',
        element: <Texts />,
        loader: textLoader,
        action: textAction
      },
      {
        path: 'musicians',
        element: <Musicians />,
        loader: musicianLoader,
        action: musicianAction
      },
      {
        path: 'events',
        element: <Events />,
        loader: eventLoader,
        action: eventAction
      },
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
      <UserContext.Provider value={currentUser} >
        <RouterProvider router={router} />
      </UserContext.Provider>
    </CssBaseline>
  );
}

export default App;
