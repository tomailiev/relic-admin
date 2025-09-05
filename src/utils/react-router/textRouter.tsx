import textAddAction from "../../actions/text/textAddAction";
import textDeleteAction from "../../actions/text/textDeleteAction";
import textEditAction from "../../actions/text/textEditAction";
import FetchError from "../../components/Common/FetchError";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import AddItem from "../../components/Items/AddItem";
import EditItem from "../../components/Items/EditItem";
import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import textItemLoader from "../../loaders/textItemLoader";
import textLoader from "../../loaders/textLoader";
import textProps from "../../props/textProps";
import { RouteObject } from "react-router-dom";
import { ItemWithAllProps } from "../../types/fnProps";

const textRouter: RouteObject[] = [
  {
    path: "texts",
    element: <LoggedIn />,
    children: [
      {
        index: true, // matches "/texts"
        element: <Items {...textProps} />,
        loader: textLoader,
      },
      {
        path: "add",
        element: <AddItem {...(textProps as ItemWithAllProps)} />,
        action: textAddAction,
      },
      {
        path: ":textId",
        element: <ItemRoute {...textProps} />,
        loader: textItemLoader,
      },
      {
        path: ":textId/delete",
        element: <FetchError />,
        action: textDeleteAction,
      },
      {
        path: ":textId/edit",
        element: <EditItem {...(textProps as ItemWithAllProps)} />,
        loader: textItemLoader,
        action: textEditAction,
      },
    ],
  },
];

export default textRouter;