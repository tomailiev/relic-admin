import FetchError from "../../components/Common/FetchError";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import AddItem from "../../components/Items/AddItem";
import EditItem from "../../components/Items/EditItem";
import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import listProps from "../../props/listProps";
import listLoader from "../../loaders/listLoader";
import listAddAction from "../../actions/list/listAddAction";
import listItemLoader from "../../loaders/listItemLoader";
import listDeleteAction from "../../actions/list/listDeleteAction";
import listEditAction from "../../actions/list/listEditAction";
import { RouteObject } from "react-router-dom";
import { ItemWithAllProps } from "../../types/fnProps";

const listRouter: RouteObject[] = [
  {
    path: "lists",
    element: <LoggedIn />,
    children: [
      {
        index: true, // matches "/lists"
        element: <Items {...listProps} />,
        loader: listLoader,
      },
      {
        path: "add",
        element: <AddItem {...(listProps as ItemWithAllProps)} />,
        action: listAddAction,
      },
      {
        path: ":listId",
        element: <ItemRoute {...listProps} />,
        loader: listItemLoader,
      },
      {
        path: ":listId/delete",
        element: <FetchError />,
        action: listDeleteAction,
      },
      {
        path: ":listId/edit",
        element: <EditItem {...(listProps as ItemWithAllProps)} />,
        loader: listItemLoader,
        action: listEditAction,
      },
    ],
  },
];

export default listRouter;