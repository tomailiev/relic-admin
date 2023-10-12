import CSVAddAction from "../../actions/CSVAddAction";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import AddItem from "../../components/Items/AddItem";
import emailProps from "../../props/emailProps";

const emailRouter = [
    {
        path: 'email/import-csv',
        element: <LoggedIn component={<AddItem {...emailProps} />} />,
        action: CSVAddAction
    },
];

export default emailRouter;