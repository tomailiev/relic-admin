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

const grantRouter: RouteObject[] = [
    {
        path: 'grants',
        element: <LoggedIn component={<Items {...grantProps} />} />,
        loader: grantLoader
      },
      {
        path: 'grants/add',
        element: <LoggedIn component={<AddItem {...grantProps} />} />,
        action: grantAddAction
      },
      {
        path: 'grants/:grantId',
        element: <LoggedIn component={<ItemRoute {...grantProps} />} />,
        loader: grantItemLoader,
      },
      {
        path: 'grants/:grantId/delete',
        element: <LoggedIn component={<FetchError />} />,
        action: grantDeleteAction
      },
      {
        path: 'grants/:grantId/edit',
        element: <LoggedIn component={<EditItem {...grantProps} />} />,
        loader: grantItemLoader,
        action: grantEditAction
      },
];

export default grantRouter;