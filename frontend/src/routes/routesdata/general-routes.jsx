import {
  Home,
  MyQuestions,
  Profile,
  Question,
  Register,
  Login,
} from "../../pages";

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
    path: "/login",
    exact: true,
    component: <Login />,
  },
];
