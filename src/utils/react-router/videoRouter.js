import videoAddAction from "../../actions/videoAddAction";
import videoDeleteAction from "../../actions/videoDeleteAction";
import videoEditAction from "../../actions/videoEditAction";
import FetchError from "../../components/Common/FetchError";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import AddItem from "../../components/Items/AddItem";
import EditItem from "../../components/Items/EditItem";
import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import videoItemLoader from "../../loaders/videoItemLoader";
import videoLoader from "../../loaders/videoLoader";
import videoProps from "../../props/videoProps";

const videoRouter = [
    {
        path: 'videos',
        element: <LoggedIn component={<Items {...videoProps} />} />,
        loader: videoLoader,
      },
      {
        path: 'videos/add',
        element: <LoggedIn component={<AddItem {...videoProps} />} />,
        action: videoAddAction,
      },
      {
        path: 'videos/:videoId',
        element: <LoggedIn component={<ItemRoute {...videoProps} />} />,
        loader: videoItemLoader
      },
      {
        path: 'videos/:videoId/delete',
        element: <LoggedIn component={<FetchError />} />,
        action: videoDeleteAction
      },
      {
        path: 'videos/:videoId/edit',
        element: <LoggedIn component={<EditItem {...videoProps} />} />,
        loader: videoItemLoader,
        action: videoEditAction
      },
];

export default videoRouter;