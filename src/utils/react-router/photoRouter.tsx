import FetchError from "../../components/Common/FetchError";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import AddItem from "../../components/Items/AddItem";
import EditItem from "../../components/Items/EditItem";
import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import { RouteObject } from "react-router-dom";
import { ItemWithAllProps } from "../../types/fnProps";
import photoProps from "../../props/photoProps";
import photoLoader from "../../loaders/photoLoader";
import photoAddAction from "../../actions/photo/photoAddAction";
import photoItemLoader from "../../loaders/photoItemLoader";
import photoDeleteAction from "../../actions/photo/photoDeleteAction";
import photoEditAction from "../../actions/photo/photoEditAction";

const photoRouter: RouteObject[] = [
  {
    path: "photos",
    element: <LoggedIn />,
    children: [
      {
        index: true, // matches "/photos"
        element: <Items {...photoProps} />,
        loader: photoLoader,
      },
      {
        path: "add",
        element: <AddItem {...(photoProps as ItemWithAllProps)} />,
        action: photoAddAction,
      },
      {
        path: ":photoId",
        element: <ItemRoute {...photoProps} />,
        loader: photoItemLoader,
      },
      {
        path: ":photoId/delete",
        element: <FetchError />,
        action: photoDeleteAction,
      },
      {
        path: ":photoId/edit",
        element: <EditItem {...(photoProps as ItemWithAllProps)} />,
        loader: photoItemLoader,
        action: photoEditAction,
      },
    ],
  },
];

export default photoRouter;