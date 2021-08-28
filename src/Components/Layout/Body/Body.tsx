import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../../../App.css';
import Search from "../../Search/Search";
import ResultsList from "../../ResultsList/ResultsList";
import User from "../../User/User";
import ActivityView from "../../Activity/ActivityView";
import NotFound from "../NotFound/NotFound";

// strongly type object for routes
interface routePaths {
    Home: string;
    ResultsList: string;
    UserViewTemplate: string;
    ActivityTemplate: string;
    NotFound: string;
    NonExistingPage: string;
}

export const getExactRoute = (route: string, id: number | string) => {
    let routeArr = route.split('/');
    routeArr[routeArr.length-1] = typeof id === 'number' ? JSON.stringify(id) : id;
    return routeArr.join('/');
}

// Define the different route paths for the app
export const routes: routePaths = {
    Home: '/',
    ResultsList: '/results',
    UserViewTemplate: '/users/:id',
    ActivityTemplate: '/activity/:id',
    NotFound: '/NotFound',
    NonExistingPage: '/*',
}

function Body() {

    return (
        <React.Fragment>
            <Switch>
                <Route exact path={routes.ActivityTemplate}>
                    <ActivityView />
                </Route>
                <Route exact path={routes.UserViewTemplate}>
                    <User/>
                </Route>
                <Route exact path={routes.ResultsList}>
                    <ResultsList />
                </Route>
                <Route exact path={routes.Home}>
                    <Search />
                </Route>
                <Route exact path={routes.NonExistingPage}>
                    <NotFound />
                </Route>
            </Switch>
        </React.Fragment>
    );
}

export default Body;