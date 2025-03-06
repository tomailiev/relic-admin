import musicianAddAction from "../../actions/musician/musicianAddAction";
import musicianDeleteAction from "../../actions/musician/musicianDeleteAction";
import musicianEditAction from "../../actions/musician/musicianEditAction";
import FetchError from "../../components/Common/FetchError";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import AddItem from "../../components/Items/AddItem";
import EditItem from "../../components/Items/EditItem";
import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import musicianItemLoader from "../../loaders/musicianItemLoader";
import musicianLoader from "../../loaders/musicianLoader";
import musicianProps from "../../props/musicianProps";
import { RouteObject } from "react-router-dom";

const musicianRouter: RouteObject[] = [
    {
        path: 'musicians',
        element: <LoggedIn component={<Items {...musicianProps} />} />,
        loader: musicianLoader,
      },
      {
        path: 'musicians/add',
        element: <LoggedIn component={<AddItem {...musicianProps} />} />,
        action: musicianAddAction,
      },
      {
        path: 'musicians/:musicianId',
        element: <LoggedIn component={<ItemRoute {...musicianProps} />} />,
        loader: musicianItemLoader
      },
      {
        path: 'musicians/:musicianId/delete',
        element: <LoggedIn component={<FetchError />} />,
        action: musicianDeleteAction
      },
      {
        path: 'musicians/:musicianId/edit',
        element: <LoggedIn component={<EditItem {...musicianProps} />} />,
        loader: musicianItemLoader,
        action: musicianEditAction
      },
];

export default musicianRouter;