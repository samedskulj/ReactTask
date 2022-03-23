import { Register, Login } from "../../pages";

export const componentRoutes = [
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
