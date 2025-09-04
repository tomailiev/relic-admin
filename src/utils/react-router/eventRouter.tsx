import eventAddAction from "../../actions/event/eventAddAction";
import eventDeleteAction from "../../actions/event/eventDeleteAction";
import eventEditAction from "../../actions/event/eventEditAction";
import FetchError from "../../components/Common/FetchError";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
// import AddItem from "../../components/Items/AddItem";
import EditItem from "../../components/Items/EditItem";
import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import eventItemLoader from "../../loaders/eventItemLoader";
import eventLoader from "../../loaders/eventLoader";
import eventProps from "../../props/eventProps";
import { RouteObject } from "react-router-dom";
import { ItemWithAllProps } from "../../types/fnProps";
import eventSourceLoader from "../../loaders/eventSourceLoader";

const eventRouter: RouteObject[] = [
  {
    path: "events",
    element: <LoggedIn />, // guard applies to all children
    children: [
      {
        index: true, // matches "/events"
        element: <Items {...eventProps} />,
        loader: eventLoader,
      },
      {
        path: "add",
        element: <EditItem {...(eventProps as ItemWithAllProps)} />,
        loader: eventSourceLoader,
        action: eventAddAction,
      },
      {
        path: ":eventId",
        element: <ItemRoute {...eventProps} />,
        loader: eventItemLoader,
      },
      {
        path: ":eventId/delete",
        element: <FetchError />,
        action: eventDeleteAction,
      },
      {
        path: ":eventId/edit",
        element: <EditItem {...(eventProps as ItemWithAllProps)} />,
        loader: eventItemLoader,
        action: eventEditAction,
      },
    ],
  },
];

export default eventRouter;