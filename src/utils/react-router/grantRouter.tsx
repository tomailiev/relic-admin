import grantAddAction from "../../actions/grant/grantAddAction";
import grantDeleteAction from "../../actions/grant/grantDeleteAction";
import grantEditAction from "../../actions/grant/grantEditAction";
import FetchError from "../../components/Common/FetchError";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import AddItem from "../../components/Items/AddItem";
import EditItem from "../../components/Items/EditItem";
import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import grantItemLoader from "../../loaders/grantItemLoader";
import grantLoader from "../../loaders/grantLoader";
import grantProps from "../../props/grantProps";
import { RouteObject } from "react-router-dom";
import { ItemWithAllProps } from "../../types/fnProps";

const grantRouter: RouteObject[] = [
  {
    path: "grants",
    element: <LoggedIn />,
    children: [
      {
        index: true, // matches "/grants"
        element: <Items {...grantProps} />,
        loader: grantLoader,
      },
      {
        path: "add",
        element: <AddItem {...(grantProps as ItemWithAllProps)} />,
        action: grantAddAction,
      },
      {
        path: ":grantId",
        element: <ItemRoute {...grantProps} />,
        loader: grantItemLoader,
      },
      {
        path: ":grantId/delete",
        element: <FetchError />,
        action: grantDeleteAction,
      },
      {
        path: ":grantId/edit",
        element: <EditItem {...(grantProps as ItemWithAllProps)} />,
        loader: grantItemLoader,
        action: grantEditAction,
      },
    ],
  },
];

export default grantRouter;