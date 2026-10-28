import { RouteObject } from "react-router-dom";
import LoggedIn from "../../components/AuthGuard/LoggedIn";
import ItemRoute from "../../components/Items/ItemRoute";
import Items from "../../components/Items/Items";
import stripeChargeItemLoader from "../../loaders/stripeChargeItemLoader";
import stripeChargeLoader from "../../loaders/stripeChargeLoader";
import stripeChargeProps from "../../props/stripeChargeProps";

const stripeChargeRouter: RouteObject[] = [
  {
    path: "stripeCharges",
    element: <LoggedIn />,
    children: [
      {
        index: true, 
        element: <Items {...stripeChargeProps} />,
        loader: stripeChargeLoader,
      },
    //   {
    //     path: "add",
    //     element: <EditItem {...(taskProps as ItemWithAllProps)} />,
    //     action: taskAddAction,
    //     loader: taskSourceLoader
    //   },
      {
        path: ":stripeChargeId",
        element: <ItemRoute {...stripeChargeProps} />,
        loader: stripeChargeItemLoader,
      },
    ],
  },
];

export default stripeChargeRouter;