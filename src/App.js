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
import videoItemLoader from './components/Videos/itemLoader';
import musicianItemLoader from './components/Musicians/itemLoader';
import eventItemLoader from './components/Events/itemLoader';
import textItemLoader from './components/Texts/itemLoader';
import AddVideo from './components/Videos/AddVideo';
import VideoItemRoute from './components/Videos/VideoItemRoute';
import MusicianItemRoute from './components/Musicians/MusicianItemRoute';
import AddMusician from './components/Musicians/AddMusician';
import AddText from './components/Texts/AddText';
import TextItemRoute from './components/Texts/TextItemRoute';
import AddEvent from './components/Events/AddEvent';
import EventItemRoute from './components/Events/EventItemRoute';

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
      },
      {
        path: 'videos/add',
        element: <LoggedIn component={<AddVideo />} />,
        action: videoAction,
      },
      {
        path: 'videos/:videoId',
        element: <LoggedIn component={<VideoItemRoute />} />,
        loader: videoItemLoader
      },
      {
        path: 'texts',
        element: <LoggedIn component={<Texts />} />,
        loader: textLoader,
      },
      {
        path: 'texts/add',
        element: <LoggedIn component={<AddText />} />,
        action: textAction
      },
      {
        path: 'texts/:textId',
        element: <LoggedIn component={<TextItemRoute />} />,
        loader: textItemLoader,
      },
      {
        path: 'musicians',
        element: <LoggedIn component={<Musicians />} />,
        loader: musicianLoader,
      },
      {
        path: 'musicians/add',
        element: <LoggedIn component={<AddMusician />} />,
        action: musicianAction,
      },
      {
        path: 'musicians/:musicianId',
        element: <LoggedIn component={<MusicianItemRoute />} />,
        loader: musicianItemLoader
      },
      {
        path: 'events',
        element: <LoggedIn component={<Events />} />,
        loader: eventLoader,
      },
      {
        path: 'events/add',
        element: <LoggedIn component={<AddEvent />} />,
        action: eventAction
      },
      {
        path: 'events/:eventId',
        element: <LoggedIn component={<EventItemRoute />} />,
        loader: eventItemLoader
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
