import donationAddAction from "../../actions/donationAddAction";
import donorDeleteAction from "../../actions/donorDeleteAction";
import donorEditAction from "../../actions/donorEditAction";
import FetchError from "../../components/Common/FetchError";
import LoggedIn from "../../components/Common/LoggedIn";
import AddDonation from "../../components/Donors/AddDonation";
import DonorItemRoute from "../../components/Donors/DonorItemRoute";
import Donors from "../../components/Donors/Donors";
import EditDonor from "../../components/Donors/EditDonor";
import donorItemLoader from "../../loaders/donorItemLoader";
import donorLoader from "../../loaders/donorLoader";

const donorRouter = [
    {
        path: 'donors',
        element: <LoggedIn component={<Donors />} />,
        loader: donorLoader
      },
      {
        path: 'donors/add-donation',
        element: <LoggedIn component={<AddDonation />} />,
        action: donationAddAction
      },
      {
        path: 'donors/:donorId',
        element: <LoggedIn component={<DonorItemRoute />} />,
        loader: donorItemLoader,
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
];

export default donorRouter;