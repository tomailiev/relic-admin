import textAddAction from "../../actions/text/textAddAction";
import textDeleteAction from "../../actions/text/textDeleteAction";
import textEditAction from "../../actions/text/textEditAction";
import FetchError from "../../components/Common/FetchError";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import AddItem from "../../components/Items/AddItem";
import EditItem from "../../components/Items/EditItem";
import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import textItemLoader from "../../loaders/textItemLoader";
import textLoader from "../../loaders/textLoader";
import textProps from "../../props/textProps";

const textRouter = [
    {
        path: 'texts',
        element: <LoggedIn component={<Items {...textProps} />} />,
        loader: textLoader,
      },
      {
        path: 'texts/add',
        element: <LoggedIn component={<AddItem {...textProps} />} />,
        action: textAddAction
      },
      {
        path: 'texts/:textId',
        element: <LoggedIn component={<ItemRoute {...textProps} />} />,
        loader: textItemLoader,
      },
      {
        path: 'texts/:textId/delete',
        element: <LoggedIn component={<FetchError />} />,
        action: textDeleteAction
      },
      {
        path: 'texts/:textId/edit',
        element: <LoggedIn component={<EditItem {...textProps} />} />,
        loader: textItemLoader,
        action: textEditAction
      },
];

export default textRouter;