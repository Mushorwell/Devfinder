import urlParams from '../Interfaces/IUrlParameters';
import { githubAPIBaseUrl, getApiUrl, makeAPICall } from "../api/apiMethods";
import IUser from "../Interfaces/IUser";
import {routes} from "../Components/Layout/Body/Body";
import {SAVE as storeUserList} from "../store/userListReducer";
import {useDispatch} from "react-redux";

// function to search for users from github, takes a string parameter
export const searchUsers = (searchValue: string) => {

    // Assemble the url for fetch request
    const urlParameters: urlParams = {
        destinationUrl: githubAPIBaseUrl,
        action: '/search/users?q=',
        queryString: encodeURIComponent(`${searchValue} in:name`)
    }
    const apiURL = getApiUrl(urlParameters);

    // Assemble request parameters
    const searchParameters: RequestInit = {
        method: 'GET',
        headers: {
            'Accept':'application/vnd.github.v3.text-match+json',
            'Content-Type': 'application/json'
        }
    }

    return makeAPICall(apiURL, searchParameters);
};