import CSVAddAction from "../../actions/CSVAddAction";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import AddItem from "../../components/Items/AddItem";
import subscriberLoader from "../../loaders/subscriberLoader";
import CSVProps from "../../props/CSVProps";

const emailRouter = [
    {
        path: 'CSVs/add',
        element: <LoggedIn component={<AddItem {...CSVProps} />} />,
        action: CSVAddAction,
        loader: subscriberLoader
    },
];

export default emailRouter;