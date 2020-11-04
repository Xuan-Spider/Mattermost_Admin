import React from "react";
import Content from "./components/content/content";
import SignIn from "./components/sign-in/sig-in";
import SignUp from "./components/sign-up/sign-up";
import NotFound from "./components/notfound/notfound";
import TeamManagement from "./components/team-management/team-management";
import Analytics from "./components/analytics/analytics";
const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Content />,
  },
  {
    path: "/signin",
    exact: true,
    main: () => <SignIn />,
  },
  {
    path: "/signup",
    exact: true,
    main: () => <SignUp />,
  },
  {
    path: "/team-management",
    exact: true,
    main: () => <TeamManagement />,
  },
  {
    path: "/analytics",
    exact: true,
    main: () => <Analytics />,
  },
  {
    path: '',
    exact: true,
    main: () => <NotFound />
  }

];

export default routes;
