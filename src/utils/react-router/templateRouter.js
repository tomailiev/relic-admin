import templateAddAction from "../../actions/templateAddAction";
import templateDeleteAction from "../../actions/templateDeleteAction";
import templateEditAction from "../../actions/templateEditAction";
import templateEditContentAction from "../../actions/templateEditContentAction";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import EditCampaignContent from "../../components/Campaigns/EditCampaignContent";
import FetchError from "../../components/Common/FetchError";
import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import EditTemplate from "../../components/Templates/EditTemplate";
import NewTemplate from "../../components/Templates/NewTemplate";
import templateEditLoader from "../../loaders/templateEditLoader";
import templateItemLoader from "../../loaders/templateItemLoader";
import templateLoader from "../../loaders/templateLoader";
import templateProps from "../../props/templateProps";

const templateRouter = [
    {
        path: 'templates',
        element: <LoggedIn component={<Items {...templateProps} />} />,
        loader: templateLoader,
    },
    {
        path: 'templates/add',
        element: <LoggedIn component={<NewTemplate {...templateProps} />} />,
        action: templateAddAction,
    },
    {
        path: 'templates/:templateId',
        element: <LoggedIn component={<ItemRoute {...templateProps} />} />,
        loader: templateItemLoader,
      },
      {
        path: 'templates/:templateId/delete',
        element: <LoggedIn component={<FetchError />} />,
        action: templateDeleteAction
      },
      {
        path: 'templates/:templateId/edit',
        element: <LoggedIn component={<EditTemplate {...templateProps} />} />,
        loader: templateEditLoader,
        action: templateEditAction
      },
      {
        path: 'templates/:templateId/edit/content',
        element: <LoggedIn component={<EditCampaignContent {...templateProps} />} />,
        loader: templateEditLoader,
        action: templateEditContentAction
      },
];

export default templateRouter;