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
        path: 'photos',
        element: <LoggedIn component={<Items {...photoProps} />} />,
        loader: photoLoader,
      },
      {
        path: 'photos/add',
        element: <LoggedIn component={<AddItem {...photoProps as ItemWithAllProps} />} />,
        action: photoAddAction,
      },
      {
        path: 'photos/:photoId',
        element: <LoggedIn component={<ItemRoute {...photoProps} />} />,
        loader: photoItemLoader
      },
      {
        path: 'photos/:photoId/delete',
        element: <LoggedIn component={<FetchError />} />,
        action: photoDeleteAction
      },
      {
        path: 'photos/:photoId/edit',
        element: <LoggedIn component={<EditItem {...photoProps as ItemWithAllProps} />} />,
        loader: photoItemLoader,
        action: photoEditAction
      },
];

export default photoRouter;