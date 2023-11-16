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
import subscriberProps from "../../props/subscriberProps";
import subscriberLoader from "../../loaders/subscriberLoader";
import subscriberItemLoader from "../../loaders/subscriberItemLoader";

const subscriberRouter = [
    {
        path: 'subscribers',
        element: <LoggedIn component={<Items {...subscriberProps} />} />,
        loader: subscriberLoader
      },
      {
        path: 'subscribers/add',
        element: <LoggedIn component={<AddItem {...subscriberProps} />} />,
        action: grantAddAction
      },
      {
        path: 'subscribers/:subscriberId',
        element: <LoggedIn component={<ItemRoute {...subscriberProps} />} />,
        loader: subscriberItemLoader,
      },
      {
        path: 'subscribers/:subscriberId/delete',
        element: <LoggedIn component={<FetchError />} />,
        action: grantDeleteAction
      },
      {
        path: 'subscribers/:subscriberId/edit',
        element: <LoggedIn component={<EditItem {...subscriberProps} />} />,
        loader: subscriberItemLoader,
        action: grantEditAction
      },
];

export default subscriberRouter;