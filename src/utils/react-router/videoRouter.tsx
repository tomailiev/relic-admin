import videoAddAction from "../../actions/video/videoAddAction";
import videoDeleteAction from "../../actions/video/videoDeleteAction";
import videoEditAction from "../../actions/video/videoEditAction";
import FetchError from "../../components/Common/FetchError";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import AddItem from "../../components/Items/AddItem";
import EditItem from "../../components/Items/EditItem";
import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import videoItemLoader from "../../loaders/videoItemLoader";
import videoLoader from "../../loaders/videoLoader";
import videoProps from "../../props/videoProps";
import { RouteObject } from "react-router-dom";
import { ItemWithAllProps } from "../../types/fnProps";

const videoRouter: RouteObject[] = [
    {
        path: 'videos',
        element: <LoggedIn component={<Items {...videoProps} />} />,
        loader: videoLoader,
      },
      {
        path: 'videos/add',
        element: <LoggedIn component={<AddItem {...videoProps as ItemWithAllProps} />} />,
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
        element: <LoggedIn component={<EditItem {...videoProps as ItemWithAllProps} />} />,
        loader: videoItemLoader,
        action: videoEditAction
      },
];

export default videoRouter;