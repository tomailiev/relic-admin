import donationAddAction from "../../actions/donationAddAction";
import donorDeleteAction from "../../actions/donorDeleteAction";
import donorEditAction from "../../actions/donorEditAction";
import FetchError from "../../components/Common/FetchError";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import AddDonation from "../../components/Donors/AddDonation";
import DonorItemRoute from "../../components/Donors/DonorItemRoute";
import Donors from "../../components/Donors/Donors";
import EditDonor from "../../components/Donors/EditDonor";
import donorItemLoader from "../../loaders/donorItemLoader";
import donorLoader from "../../loaders/donorLoader";
import ImportDonor from "../../components/Emails/ImportDonor";
import donorsSubsLoader from "../../loaders/donorsSubsLoader";
import donorsImportAction from "../../actions/donorsImportAction";
import donorThankAction from "../../actions/donorThankAction";
import donorTextLoader from "../../loaders/donorTextLoader";
import donorProps from "../../props/donorProps";
import AddItem from "../../components/Items/AddItem";
import donorAddAction from "../../actions/donorAddAction";

const donorRouter = [
  {
    path: 'donors',
    element: <LoggedIn component={<Donors />} />,
    loader: donorLoader
  },
  {
    path: 'donors/new-donation',
    element: <LoggedIn component={<AddDonation />} />,
    action: donationAddAction
  },
  {
    path: 'donors/add',
    element: <LoggedIn component={<AddItem {...donorProps} />} />,
    action: donorAddAction
  },
  {
    path: 'donors/:donorId',
    element: <LoggedIn component={<DonorItemRoute />} />,
    loader: donorItemLoader,
    action: donorThankAction
  },
  {
    path: 'donors/:donorId/delete',
    element: <LoggedIn component={<FetchError />} />,
    action: donorDeleteAction
  },
  {
    path: 'donors/:donorId/edit',
    element: <LoggedIn component={<EditDonor />} />,
    loader: donorItemLoader,
    action: donorEditAction
  },
  {
    path: 'donors/import',
    element: <LoggedIn component={<ImportDonor />} />,
    loader: donorsSubsLoader,
    action: donorsImportAction
  },
  {
    path: 'donors/text',
    loader: donorTextLoader
  }
];

export default donorRouter;