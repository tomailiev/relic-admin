import Home from '../../components/Home/Home';
import ErrorPage from '../../components/Common/ErrorPage';
import Videos from '../../components/Videos/Videos';
import videoLoader from '../../components/Videos/loader';
import Musicians from '../../components/Musicians/Musicians';
import musicianLoader from '../../components/Musicians/loader';
import Texts from '../../components/Texts/Texts';
import textLoader from '../../components/Texts/loader';
import Events from '../../components/Events/Events';
import eventLoader from '../../components/Events/loader';
import textAction from '../../components/Texts/action';
import videoAction from '../../components/Videos/action';
import musicianAction from '../../components/Musicians/action';
import eventAction from '../../components/Events/action';
import Index from '../../components/Index/Index';
import LogIn from '../../components/LogIn/LogIn';
import signInAction from '../../components/LogIn/action';
import signOutAction from '../../components/LogOut/action';
import LoggedIn from '../../components/Common/LoggedIn';
import LoggedOut from '../../components/Common/LoggedOut';
import videoItemLoader from '../../components/Videos/itemLoader';
import musicianItemLoader from '../../components/Musicians/itemLoader';
import eventItemLoader from '../../components/Events/itemLoader';
import textItemLoader from '../../components/Texts/itemLoader';
import AddVideo from '../../components/Videos/AddVideo';
import VideoItemRoute from '../../components/Videos/VideoItemRoute';
import MusicianItemRoute from '../../components/Musicians/MusicianItemRoute';
import AddMusician from '../../components/Musicians/AddMusician';
import AddText from '../../components/Texts/AddText';
import TextItemRoute from '../../components/Texts/TextItemRoute';
import AddEvent from '../../components/Events/AddEvent';
import EventItemRoute from '../../components/Events/EventItemRoute';
import eventDeleteAction from '../../components/Events/deleteAction';
import videoDeleteAction from '../../components/Videos/deleteAction';
import musicianDeleteAction from '../../components/Musicians/deleteAction';
import textDeleteAction from '../../components/Texts/deleteAction';
import { createBrowserRouter } from 'react-router-dom';
import EditVideo from '../../components/Videos/EditVideo';
import videoEditAction from '../../components/Videos/editAction';

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
          path: 'videos/:videoId/delete',
          action: videoDeleteAction
        },
        {
            path: 'videos/:videoId/edit',
            element: <LoggedIn component={<EditVideo />} />,
            loader: videoItemLoader,
            action: videoEditAction
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
          path: 'texts/:textId/delete',
          action: textDeleteAction
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
          path: 'musicians/:musicianId/delete',
          action: musicianDeleteAction
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
          loader: eventItemLoader,
        },
        {
          path: 'events/:eventId/delete',
          action: eventDeleteAction
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
  

  export default router;