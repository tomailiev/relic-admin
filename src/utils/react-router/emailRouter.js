import CSVAddAction from "../../actions/CSVAddAction";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import AddItem from "../../components/Items/AddItem";
import CSVProps from "../../props/CSVProps";

const emailRouter = [
    {
        path: 'import-csv',
        element: <LoggedIn component={<AddItem {...CSVProps} />} />,
        action: CSVAddAction
    },
];

export default emailRouter;