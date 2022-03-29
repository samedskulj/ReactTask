import {
  Home,
  MyQuestions,
  Profile,
  Question,
  Register,
  Login,
} from "../../pages";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";

export const generalRoutes = [
  {
    path: "/",
    exact: true,
    component: <Home />,
    layout: true,
  },
  {
    path: "/myquestions",
    exact: true,
    component: <MyQuestions />,
    layout: true,
    auth: true,
  },
  {
    path: "/question/:id",
    exact: true,
    component: <Question />,
    layout: true,
  },
  {
    path: "/profile",
    exact: true,
    component: <Profile />,
    layout: true,
    auth: true,
  },
  {
    path: "/register",
    exact: true,
    component: <Register />,
  },
  {
    path: "/resetpassword",
    exact: true,
    component: <ResetPassword />,
    layout: true,
    auth: true,
  },
  {
    path: "/login",
    exact: true,
    component: <Login />,
  },
];
