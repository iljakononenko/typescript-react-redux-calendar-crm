import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {privateRoutes, publicRoutes, RouteNames} from "../routes";
import {useTypedSelector} from "../hooks/useTypedSelector";

const AppRouter = () => {

    const {isAuth} = useTypedSelector(state => state.auth);

    return (
        isAuth
            ?
            <Switch>
                {privateRoutes.map(route =>
                    <Route key={route.path} path={route.path} component={route.component} exact={route.exact} />
                )}
                <Redirect to={RouteNames.EVENT}></Redirect>
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route =>
                    <Route key={route.path} path={route.path} component={route.component} exact={route.exact} />
                )}
                <Redirect to={RouteNames.LOGIN}></Redirect>
            </Switch>
    );
};

export default AppRouter;
