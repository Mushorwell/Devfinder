import React, {useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import '../../../App.css';
import Search from "../../Search/Search";
import ResultsList from "../../ResultsList/ResultsList";
import User from "../../User/User";

// strongly type object for routes
interface routePaths {
    Home: string;
    ResultsList: string;
    UserView: string;
}

// Define the different route paths for the app
export const routes: routePaths = {
    Home: '/',
    ResultsList: '/results',
    UserView: '/users/:id'
}

function Body() {

    // State fpr tje search value
    const [searchName, setSearchName] = useState<string>('');

    return (
        <React.Fragment>
            <Switch>
                <Route exact path={routes.UserView}>
                    <User />
                </Route>
                <Route exact path={routes.ResultsList}>
                    <ResultsList searchVal={searchName} setSearchVal={setSearchName} />
                </Route>
                <Route exact path={routes.Home}>
                    <Search searchVal={searchName} setSearchVal={setSearchName} />
                </Route>
            </Switch>
        </React.Fragment>
    );
}

export default Body;