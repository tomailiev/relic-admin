import eventAddAction from "../../actions/event/eventAddAction";
import eventDeleteAction from "../../actions/event/eventDeleteAction";
import eventEditAction from "../../actions/event/eventEditAction";
import FetchError from "../../components/Common/FetchError";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import AddItem from "../../components/Items/AddItem";
import EditItem from "../../components/Items/EditItem";
import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import eventItemLoader from "../../loaders/eventItemLoader";
import eventLoader from "../../loaders/eventLoader";
import eventProps from "../../props/eventProps";
import { RouteObject } from "react-router-dom";

const eventRouter: RouteObject = [
  {
    path: 'events',
    element: <LoggedIn component={<Items {...eventProps} />} />,
    loader: eventLoader,
  },
  {
    path: 'events/add',
    element: <LoggedIn component={<AddItem {...eventProps} />} />,
    action: eventAddAction
  },
  {
    path: 'events/:eventId',
    element: <LoggedIn component={<ItemRoute {...eventProps} />} />,
    loader: eventItemLoader,
  },
  {
    path: 'events/:eventId/delete',
    element: <LoggedIn component={<FetchError />} />,
    action: eventDeleteAction
  },
  {
    path: 'events/:eventId/edit',
    element: <LoggedIn component={<EditItem {...eventProps} />} />,
    loader: eventItemLoader,
    action: eventEditAction
  },
];

export default eventRouter;