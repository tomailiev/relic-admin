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
import { RouteObject } from "react-router-dom";
import { ItemWithAllProps } from "../../types/fnProps";

const subscriberRouter: RouteObject[] = [
  {
    path: "subscribers",
    element: <LoggedIn />,
    children: [
      {
        index: true, // matches "/subscribers"
        element: <Items {...subscriberProps} />,
        loader: subscriberLoader,
      },
      {
        path: "add",
        element: <AddItem {...(subscriberProps as ItemWithAllProps)} />,
        action: subscriberAddAction,
      },
      {
        path: ":subscriberId",
        element: <ItemRoute {...subscriberProps} />,
        loader: subscriberItemLoader,
      },
      {
        path: ":subscriberId/delete",
        element: <FetchError />,
        action: subscriberDeleteAction,
      },
      {
        path: ":subscriberId/edit",
        element: <EditItem {...(subscriberProps as ItemWithAllProps)} />,
        loader: subscriberItemLoader,
        action: subscriberEditAction,
      },
      {
        path: "import-donors",
        element: <ImportDonor />,
        loader: subscriberDonorLoader,
        action: subscriberImportDonorsAction,
      },
    ],
  },
];

export default subscriberRouter;