import { Home, MyQuestions, Profile, Question } from "../../pages";

export const generalRoutes = [
  {
    path: "/",
    exact: true,
    component: <Home />,
  },
  {
    path: "/myquestions",
    exact: true,
    component: <MyQuestions />,
  },
  {
    path: "/question/:id",
    exact: true,
    component: <Question />,
  },
  {
    path: "/profile",
    exact: true,
    component: <Profile />,
  },
];
