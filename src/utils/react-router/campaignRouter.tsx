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
    {
        path: 'campaigns/:campaignId',
        element: <LoggedIn component={<ItemRoute {...campaignProps} />} />,
        loader: campaignItemLoader,
        action: campaignSendAction
      },
      {
        path: 'campaigns/:campaignId/delete',
        element: <LoggedIn component={<FetchError />} />,
        action: campaignDeleteAction
      },
      {
        path: 'campaigns/:campaignId/edit',
        element: <LoggedIn component={<EditCampaign {...campaignProps} />} />,
        loader: campaignEditLoader,
        action: campaignEditAction
      },
      {
        path: 'campaigns/:campaignId/edit/content',
        element: <LoggedIn component={<EditCampaignContent {...campaignProps} />} />,
        loader: campaignEditLoader,
        action: campaignEditContentAction
      },
];

export default campaignRouter;