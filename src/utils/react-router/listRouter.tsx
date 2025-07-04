import FetchError from "../../components/Common/FetchError";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import AddItem from "../../components/Items/AddItem";
import EditItem from "../../components/Items/EditItem";
import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import listProps from "../../props/listProps";
import listLoader from "../../loaders/listLoader";
import listAddAction from "../../actions/list/listAddAction";
import listItemLoader from "../../loaders/listItemLoader";
import listDeleteAction from "../../actions/list/listDeleteAction";
import listEditAction from "../../actions/list/listEditAction";
import { RouteObject } from "react-router-dom";
import { ItemWithAllProps } from "../../types/fnProps";

const listRouter: RouteObject[] = [
    {
        path: 'lists',
        element: <LoggedIn component={<Items {...listProps} />} />,
        loader: listLoader,
    },
    {
        path: 'lists/add',
        element: <LoggedIn component={<AddItem {...listProps as ItemWithAllProps} />} />,
        action: listAddAction,
    },
    {
        path: 'lists/:listId',
        element: <LoggedIn component={<ItemRoute {...listProps} />} />,
        loader: listItemLoader
    },
    {
        path: 'lists/:listId/delete',
        element: <LoggedIn component={<FetchError />} />,
        action: listDeleteAction
    },
    {
        path: 'lists/:listId/edit',
        element: <LoggedIn component={<EditItem {...listProps as ItemWithAllProps} />} />,
        loader: listItemLoader,
        action: listEditAction
    },
];

export default listRouter;