import urlParams from '../Interfaces/IUrlParameters';
import { githubAPIBaseUrl, getApiUrl, makeAPICall } from "../api/apiMethods";

// function to search for users from github, takes a string parameter
export const searchRecentActivities = (username: string) => {

    const action = `/users/${username}/events`;

    // Assemble the url for fetch request
    const urlParameters: urlParams = {
        destinationUrl: githubAPIBaseUrl,
        action: action,
        queryString: ''
    }
    const apiURL = getApiUrl(urlParameters);

    // Assemble request parameters
    const searchActivityParameters: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return makeAPICall(apiURL, searchActivityParameters);
};