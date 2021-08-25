import urlParams from '../Interfaces/IUrlParameters';
import { githubAPIBaseUrl, getApiUrl, makeAPICall } from "../api/apiMethods";

// function to search for users from github, takes a string parameter
export const searchUsers = (searchValue: string) => {

    // Assemble the url for fetch request
    const urlParameters: urlParams = {
        destinationUrl: githubAPIBaseUrl,
        action: '/search/users?q=',
        queryString: searchValue
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

