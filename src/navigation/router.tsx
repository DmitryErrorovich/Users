import React from 'react';
import {Route, Switch} from "react-router";
import {ROUTES} from "./const";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import UserPage from "../pages/UserPage";

export const Router = () => {
    return (
        <Switch>
            <Route exact path={ROUTES.ROOT} component={Home} />
            <Route exact path={ROUTES.USER_PAGE} component={UserPage} />

            // Private routes below

            // 404 page below
                <Route path={'*'}>
                    <NotFound />
                </Route>
        </Switch>
    )
}