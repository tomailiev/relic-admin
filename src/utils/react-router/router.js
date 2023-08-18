import Home from '../../components/Home/Home';
import ErrorPage from '../../components/Common/ErrorPage';
import Videos from '../../components/Videos/Videos';
import Musicians from '../../components/Musicians/Musicians';
import Texts from '../../components/Texts/Texts';
import Events from '../../components/Events/Events';
import Index from '../../components/Index/Index';
import LogIn from '../../components/LogIn/LogIn';
import LoggedIn from '../../components/Common/LoggedIn';
import LoggedOut from '../../components/Common/LoggedOut';
import AddVideo from '../../components/Videos/AddVideo';
import VideoItemRoute from '../../components/Videos/VideoItemRoute';
import MusicianItemRoute from '../../components/Musicians/MusicianItemRoute';
import AddMusician from '../../components/Musicians/AddMusician';
import AddText from '../../components/Texts/AddText';
import TextItemRoute from '../../components/Texts/TextItemRoute';
import AddEvent from '../../components/Events/AddEvent';
import EventItemRoute from '../../components/Events/EventItemRoute';
import { createBrowserRouter } from 'react-router-dom';
import EditVideo from '../../components/Videos/EditVideo';
import EditMusician from '../../components/Musicians/EditMusician';
import EditEvent from '../../components/Events/EditEvent';
import EditText from '../../components/Texts/EditText';
import Register from '../../components/Register/Register';
import VerifyReset from '../../components/Common/VerifyReset';
import videoAddAction from '../../actions/videoAddAction';
import videoDeleteAction from '../../actions/videoDeleteAction';
import videoEditAction from '../../actions/videoEditAction';
import textAddAction from '../../actions/textAddAction';
import textDeleteAction from '../../actions/textDeleteAction';
import textEditAction from '../../actions/textEditAction';
import musicianAddAction from '../../actions/musicianAddAction';
import musicianDeleteAction from '../../actions/musicianDeleteAction';
import musicianEditAction from '../../actions/musicianEditAction';
import eventAddAction from '../../actions/eventAddAction';
import eventDeleteAction from '../../actions/eventDeleteAction';
import eventEditAction from '../../actions/eventEditAction';
import signInAction from '../../actions/signInAction';
import registerAction from '../../actions/registerAction';
import signOutAction from '../../actions/signOutAction';
import verifyResetAction from '../../actions/verifyResetAction';
import videoLoader from '../../loaders/videoLoader';
import videoItemLoader from '../../loaders/videoItemLoader';
import textLoader from '../../loaders/textLoader';
import textItemLoader from '../../loaders/textItemLoader';
import musicianLoader from '../../loaders/musicianLoader';
import musicianItemLoader from '../../loaders/musicianItemLoader';
import eventLoader from '../../loaders/eventLoader';
import eventItemLoader from '../../loaders/eventItemLoader';
import Donors from '../../components/Donors/Donors';
import donorLoader from '../../loaders/donorLoader';
import AddDonation from '../../components/Donors/AddDonation';

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
        action: videoAddAction,
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
        action: textAddAction
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
        path: 'texts/:textId/edit',
        element: <LoggedIn component={<EditText />} />,
        loader: textItemLoader,
        action: textEditAction
      },
      {
        path: 'musicians',
        element: <LoggedIn component={<Musicians />} />,
        loader: musicianLoader,
      },
      {
        path: 'musicians/add',
        element: <LoggedIn component={<AddMusician />} />,
        action: musicianAddAction,
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
        path: 'musicians/:musicianId/edit',
        element: <LoggedIn component={<EditMusician />} />,
        loader: musicianItemLoader,
        action: musicianEditAction
      },
      {
        path: 'events',
        element: <LoggedIn component={<Events />} />,
        loader: eventLoader,
      },
      {
        path: 'events/add',
        element: <LoggedIn component={<AddEvent />} />,
        action: eventAddAction
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
        path: 'events/:eventId/edit',
        element: <LoggedIn component={<EditEvent />} />,
        loader: eventItemLoader,
        action: eventEditAction
      },
      {
        path: 'donors',
        element: <LoggedIn component={<Donors />} />,
        loader: donorLoader
      },
      {
        path: 'donations/add',
        element: <LoggedIn component={<AddDonation />} />,
        action: ''
      },
      {
        path: 'login',
        element: <LoggedOut component={<LogIn />} />,
        action: signInAction
      },
      {
        path: 'register',
        element: <LoggedOut component={<Register />} />,
        action: registerAction
      },
      {
        path: 'logout',
        action: signOutAction
      },
      {
        path: 'verify',
        element: <LoggedOut component={<VerifyReset />} />,
        action: verifyResetAction
      },
      {
        path: 'reset',
        element: <LoggedOut component={<VerifyReset />} />,
        action: verifyResetAction
      }
    ]
  },
]);


export default router;