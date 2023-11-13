import CSVAddAction from "../../actions/CSVAddAction";
import CSVDeleteAction from "../../actions/CSVDeleteAction";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import FetchError from "../../components/Common/FetchError";
import EditCSV from "../../components/Emails/EditCSV";
import AddItem from "../../components/Items/AddItem";
// import EditItem from "../../components/Items/EditItem";
import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import csvEditItemLoader from "../../loaders/csvEditItemLoader";
import csvItemLoader from "../../loaders/csvItemLoader";
import csvLoader from "../../loaders/csvLoader";
import subscriberLoader from "../../loaders/subscriberLoader";
import CSVProps from "../../props/CSVProps";

const csvRouter = [
    {
        path: 'CSVs',
        element: <LoggedIn component={<Items {...CSVProps} />} />,
        loader: csvLoader,
    },
    {
        path: 'CSVs/add',
        element: <LoggedIn component={<AddItem {...CSVProps} />} />,
        action: CSVAddAction,
        loader: subscriberLoader
    },
    {
        path: 'CSVs/:CSVId',
        element: <LoggedIn component={<ItemRoute {...CSVProps} />} />,
        loader: csvItemLoader,
      },
      {
        path: 'CSVs/:CSVId/delete',
        element: <LoggedIn component={<FetchError />} />,
        action: CSVDeleteAction
      },
      {
        path: 'CSVs/:CSVId/edit',
        element: <LoggedIn component={<EditCSV {...CSVProps} />} />,
        loader: csvEditItemLoader,
        action: CSVAddAction
      },
];

export default csvRouter;