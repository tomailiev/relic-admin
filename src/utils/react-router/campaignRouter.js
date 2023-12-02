// import CSVAddAction from "../../actions/CSVAddAction";
// import CSVDeleteAction from "../../actions/CSVDeleteAction";
import campaignAddAction from "../../actions/campaignAddAction";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import NewCampaign from "../../components/Campaigns/NewCampaign";
import FetchError from "../../components/Common/FetchError";
// import EditCSV from "../../components/Emails/EditCSV";
import AddItem from "../../components/Items/AddItem";
// import EditItem from "../../components/Items/EditItem";
// import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import campaignAddLoader from "../../loaders/campaignAddLoader";
import campaignLoader from "../../loaders/campaignLoader";
// import csvEditItemLoader from "../../loaders/csvEditItemLoader";
// import csvItemLoader from "../../loaders/csvItemLoader";
// import csvLoader from "../../loaders/csvLoader";
// import subscriberLoader from "../../loaders/subscriberLoader";
// import CSVProps from "../../props/CSVProps";
import campaignProps from "../../props/campaignProps";

const campaignRouter = [
    {
        path: 'campaigns',
        element: <LoggedIn component={<Items {...campaignProps} />} />,
        loader: campaignLoader,
    },
    {
        path: 'campaigns/add',
        element: <LoggedIn component={<NewCampaign {...campaignProps} />} />,
        action: campaignAddAction,
        loader: campaignAddLoader
    },
    // {
    //     path: 'CSVs/:CSVId',
    //     element: <LoggedIn component={<ItemRoute {...CSVProps} />} />,
    //     loader: csvItemLoader,
    //   },
    //   {
    //     path: 'CSVs/:CSVId/delete',
    //     element: <LoggedIn component={<FetchError />} />,
    //     action: CSVDeleteAction
    //   },
    //   {
    //     path: 'CSVs/:CSVId/edit',
    //     element: <LoggedIn component={<EditCSV {...CSVProps} />} />,
    //     loader: csvEditItemLoader,
    //     action: CSVAddAction
    //   },
];

export default campaignRouter;