import React from "react";
import { Route, Switch } from "react-router";
import { ROUTES } from "./const";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import UserPage from "../pages/UserPage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export const Router = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.ROOT} component={Home} />
      <Route exact path={ROUTES.USER_PAGE} component={UserPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
      <Route path={"*"}>
        <NotFound />
      </Route>
    </Switch>
  );
};
