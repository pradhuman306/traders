import HomeContainer from "../Containers/HomeContainer";
import ResetPassword from "../pages/ResetPassword";
import CreateNewPassword from "../pages/ResetPassword/CreateNewPassword";
import Setting from "../pages/Setting";
import Signin from "../pages/Signin";

export const routes = [
  {
    path: "signin",
    component: <Signin />,
  },
  {
    path: "reset-password",
    component: <ResetPassword />,
  },
  {
    path: "reset-password/:token",
    component: <CreateNewPassword />,
  },
];
export const privateroutes = [
  {
    path: "dashboard",
    component: <HomeContainer />,
  },
  {
    path: "settings",
    component: <Setting />,
  },
];
