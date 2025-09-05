import { RouteObject } from "react-router-dom";
import campaignAddAction from "../../actions/campaign/campaignAddAction";
import campaignDeleteAction from "../../actions/campaign/campaignDeleteAction";
import campaignEditAction from "../../actions/campaign/campaignEditAction";
import campaignEditContentAction from "../../actions/campaign/campaignEditContentAction";
import campaignSendAction from "../../actions/campaign/campaignSendAction";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import EditCampaign from "../../components/Campaigns/EditCampaign";
import EditCampaignContent from "../../components/Campaigns/EditCampaignContent";
import NewCampaign from "../../components/Campaigns/NewCampaign";
import FetchError from "../../components/Common/FetchError";
import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import campaignAddLoader from "../../loaders/campaignAddLoader";
import campaignEditLoader from "../../loaders/campaignEditLoader";
import campaignItemLoader from "../../loaders/campaignItemLoader";
import campaignLoader from "../../loaders/campaignLoader";
import campaignProps from "../../props/campaignProps";

const campaignRouter: RouteObject[] = [
  {
    path: "campaigns",
    element: <LoggedIn />, // guard wrapper
    children: [
      {
        index: true, // matches "/campaigns"
        element: <Items {...campaignProps} />,
        loader: campaignLoader,
      },
      {
        path: "add",
        element: <NewCampaign {...campaignProps} />,
        action: campaignAddAction,
        loader: campaignAddLoader,
      },
      {
        path: ":campaignId",
        element: <ItemRoute {...campaignProps} />,
        loader: campaignItemLoader,
        action: campaignSendAction,
      },
      {
        path: ":campaignId/delete",
        element: <FetchError />,
        action: campaignDeleteAction,
      },
      {
        path: ":campaignId/edit",
        element: <EditCampaign {...campaignProps} />,
        loader: campaignEditLoader,
        action: campaignEditAction,
      },
      {
        path: ":campaignId/edit/content",
        element: <EditCampaignContent {...campaignProps} />,
        loader: campaignEditLoader,
        action: campaignEditContentAction,
      },
    ],
  },
];
export default campaignRouter;