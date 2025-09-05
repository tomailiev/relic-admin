import musicianAddAction from "../../actions/musician/musicianAddAction";
import musicianDeleteAction from "../../actions/musician/musicianDeleteAction";
import musicianEditAction from "../../actions/musician/musicianEditAction";
import FetchError from "../../components/Common/FetchError";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import AddItem from "../../components/Items/AddItem";
import EditItem from "../../components/Items/EditItem";
import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import musicianItemLoader from "../../loaders/musicianItemLoader";
import musicianLoader from "../../loaders/musicianLoader";
import musicianProps from "../../props/musicianProps";
import { RouteObject } from "react-router-dom";
import { ItemWithAllProps } from "../../types/fnProps";

const musicianRouter: RouteObject[] = [
  {
    path: "musicians",
    element: <LoggedIn />,
    children: [
      {
        index: true, // matches "/musicians"
        element: <Items {...musicianProps} />,
        loader: musicianLoader,
      },
      {
        path: "add",
        element: <AddItem {...(musicianProps as ItemWithAllProps)} />,
        action: musicianAddAction,
      },
      {
        path: ":musicianId",
        element: <ItemRoute {...musicianProps} />,
        loader: musicianItemLoader,
      },
      {
        path: ":musicianId/delete",
        element: <FetchError />,
        action: musicianDeleteAction,
      },
      {
        path: ":musicianId/edit",
        element: <EditItem {...(musicianProps as ItemWithAllProps)} />,
        loader: musicianItemLoader,
        action: musicianEditAction,
      },
    ],
  },
];

export default musicianRouter;