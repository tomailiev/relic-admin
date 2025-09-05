// import donationAddAction from "../../actions/donor/donationAddAction";
import donorDeleteAction from "../../actions/donor/donorDeleteAction";
import donorEditAction from "../../actions/donor/donorEditAction";
import FetchError from "../../components/Common/FetchError";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import AddDonation from "../../components/Donors/AddDonation";
import DonorItemRoute from "../../components/Donors/DonorItemRoute";
import Donors from "../../components/Donors/Donors";
// import EditDonor from "../../components/Donors/EditDonor";
import donorItemLoader from "../../loaders/donorItemLoader";
import donorLoader from "../../loaders/donorLoader";
// import ImportDonor from "../../components/Subscribers/ImportDonor";
// import donorsSubsLoader from "../../loaders/donorsSubsLoader";
// import donorsImportAction from "../../actions/donor/donorsImportAction";
import donorThankAction from "../../actions/donor/donorThankAction";
import donorTextLoader from "../../loaders/donorTextLoader";
import donorProps from "../../props/donorProps";
import AddItem from "../../components/Items/AddItem";
import donorAddAction from "../../actions/donor/donorAddAction";
import EditItem from "../../components/Items/EditItem";
import { RouteObject } from "react-router-dom";
import { ItemWithAllProps } from "../../types/fnProps";

const donorRouter: RouteObject[] = [
  {
    path: "donors",
    element: <LoggedIn />,
    children: [
      {
        index: true, // matches "/donors"
        element: <Donors />,
        loader: donorLoader,
      },
      {
        path: "new-donation",
        element: <AddDonation />,
        // action: donationAddAction
      },
      {
        path: "add",
        element: <AddItem {...(donorProps as ItemWithAllProps)} />,
        action: donorAddAction,
      },
      {
        path: ":donorId",
        element: <DonorItemRoute />,
        loader: donorItemLoader,
        action: donorThankAction,
      },
      {
        path: ":donorId/delete",
        element: <FetchError />,
        action: donorDeleteAction,
      },
      {
        path: ":donorId/edit",
        element: <EditItem {...(donorProps as ItemWithAllProps)} />,
        loader: donorItemLoader,
        action: donorEditAction,
      },
      {
        path: "text",
        loader: donorTextLoader,
      },
    ],
  },
];

export default donorRouter;