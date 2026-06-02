import FetchError from "../../components/Common/FetchError";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import AddItem from "../../components/Items/AddItem";
import EditItem from "../../components/Items/EditItem";
import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import { RouteObject } from "react-router-dom";
import { ItemWithAllProps } from "../../types/fnProps";
import logProps from "../../props/logProps";
import logLoader from "../../loaders/logLoader";
import logAddAction from "../../actions/log/logAddAction";
import logItemLoader from "../../loaders/logItemLoader";
import logDeleteAction from "../../actions/log/logDeleteAction";
import logEditAction from "../../actions/log/logEditAction";
import taskProps from "../../props/taskProps";
import taskLoader from "../../loaders/taskLoader";

const taskRouter: RouteObject[] = [
  {
    path: "tasks",
    element: <LoggedIn />,
    children: [
      {
        index: true, 
        element: <Items {...taskProps} />,
        loader: taskLoader,
      },
    //   {
    //     path: "add",
    //     element: <AddItem {...(logProps as ItemWithAllProps)} />,
    //     action: logAddAction,
    //   },
    //   {
    //     path: ":logId",
    //     element: <ItemRoute {...logProps} />,
    //     loader: logItemLoader,
    //   },
    //   {
    //     path: ":logId/delete",
    //     element: <FetchError />,
    //     action: logDeleteAction,
    //   },
    //   {
    //     path: ":logId/edit",
    //     element: <EditItem {...(logProps as ItemWithAllProps)} />,
    //     loader: logItemLoader,
    //     action: logEditAction,
    //   },
    ],
  },
];

export default taskRouter;