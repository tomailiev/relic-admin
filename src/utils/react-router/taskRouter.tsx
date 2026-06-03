import FetchError from "../../components/Common/FetchError";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import EditItem from "../../components/Items/EditItem";
import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import { RouteObject } from "react-router-dom";
import { ItemWithAllProps } from "../../types/fnProps";
import taskProps from "../../props/taskProps";
import taskLoader from "../../loaders/taskLoader";
import taskItemLoader from "../../loaders/taskItemLoader";
import taskStatusUpdateAction from "../../actions/task/taskStatusUpdateAction";
import taskAddAction from "../../actions/task/taskAddAction";
import taskSourceLoader from "../../loaders/taskSourceLoader";
import taskDeleteAction from "../../actions/task/taskDeleteAction";
import taskEditAction from "../../actions/task/taskEditAction";

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
      {
        path: "add",
        element: <EditItem {...(taskProps as ItemWithAllProps)} />,
        action: taskAddAction,
        loader: taskSourceLoader
      },
      {
        path: ":taskId",
        element: <ItemRoute {...taskProps} />,
        loader: taskItemLoader,
        action: taskStatusUpdateAction
      },
      {
        path: ":taskId/delete",
        element: <FetchError />,
        action: taskDeleteAction,
      },
      {
        path: ":taskId/edit",
        element: <EditItem {...(taskProps as ItemWithAllProps)} />,
        loader: taskItemLoader,
        action: taskEditAction,
      },
    ],
  },
];

export default taskRouter;