import grantAddAction from "../../actions/grantAddAction";
import grantDeleteAction from "../../actions/grantDeleteAction";
import grantEditAction from "../../actions/grantEditAction";
import FetchError from "../../components/Common/FetchError";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import AddItem from "../../components/Items/AddItem";
import EditItem from "../../components/Items/EditItem";
import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import grantItemLoader from "../../loaders/grantItemLoader";
import grantLoader from "../../loaders/grantLoader";
import grantProps from "../../props/grantProps";

const grantRouter = [
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