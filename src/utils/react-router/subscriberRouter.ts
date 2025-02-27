import FetchError from "../../components/Common/FetchError";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import AddItem from "../../components/Items/AddItem";
import EditItem from "../../components/Items/EditItem";
import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import subscriberProps from "../../props/subscriberProps";
import subscriberLoader from "../../loaders/subscriberLoader";
import subscriberItemLoader from "../../loaders/subscriberItemLoader";
import subscriberAddAction from "../../actions/subscriber/subscriberAddAction";
import subscriberDeleteAction from "../../actions/subscriber/subscriberDeleteAction";
import subscriberEditAction from "../../actions/subscriber/subscriberEditAction";
import ImportDonor from "../../components/Subscribers/ImportDonor";
import subscriberImportDonorsAction from "../../actions/subscriber/subscriberImportDonorsAction";
import subscriberDonorLoader from "../../loaders/subscriberDonorLoader";

const subscriberRouter = [
  {
    path: 'subscribers',
    element: <LoggedIn component={<Items {...subscriberProps} />} />,
    loader: subscriberLoader
  },
  {
    path: 'subscribers/add',
    element: <LoggedIn component={<AddItem {...subscriberProps} />} />,
    action: subscriberAddAction
  },
  {
    path: 'subscribers/:subscriberId',
    element: <LoggedIn component={<ItemRoute {...subscriberProps} />} />,
    loader: subscriberItemLoader,
  },
  {
    path: 'subscribers/:subscriberId/delete',
    element: <LoggedIn component={<FetchError />} />,
    action: subscriberDeleteAction
  },
  {
    path: 'subscribers/:subscriberId/edit',
    element: <LoggedIn component={<EditItem {...subscriberProps} />} />,
    loader: subscriberItemLoader,
    action: subscriberEditAction
  },
  {
    path: 'subscribers/import-donors',
    element: <LoggedIn component={<ImportDonor />} />,
    loader: subscriberDonorLoader,
    action: subscriberImportDonorsAction
  },
];

export default subscriberRouter;