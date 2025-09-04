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
    path: "videos",
    element: <LoggedIn />,
    children: [
      {
        index: true, // matches "/videos"
        element: <Items {...videoProps} />,
        loader: videoLoader,
      },
      {
        path: "add",
        element: <AddItem {...(videoProps as ItemWithAllProps)} />,
        action: videoAddAction,
      },
      {
        path: ":videoId",
        element: <ItemRoute {...videoProps} />,
        loader: videoItemLoader,
      },
      {
        path: ":videoId/delete",
        element: <FetchError />,
        action: videoDeleteAction,
      },
      {
        path: ":videoId/edit",
        element: <EditItem {...(videoProps as ItemWithAllProps)} />,
        loader: videoItemLoader,
        action: videoEditAction,
      },
    ],
  },
];

export default videoRouter;