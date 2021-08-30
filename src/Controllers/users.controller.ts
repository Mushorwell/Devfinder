import urlParams from '../Interfaces/IUrlParameters';
import {getApiUrl, githubAPIBaseUrl, makeAPICall} from "../api/apiMethods";
import IUser from "../Interfaces/IUser";

// function to search for users from github, takes a string parameter
export const searchUsers = (searchValue: string, page: number = 1) => {

    // Assemble the url for fetch request
    const urlParameters: urlParams = {
        destinationUrl: githubAPIBaseUrl,
        action: '/search/users?q=',
        queryString: `${searchValue}`+encodeURIComponent(' in:name')+`&per_page=10&page=${page}&sort=name&order=asc`,
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

    return makeAPICall(apiURL, searchParameters).then(
        users => {
            // Check the number of search results
            if (users){
                if (users.total_count<10){
                    return {
                        currentPage: page,
                        totalPages: 1,
                        loadedUsers: extractResponse(users.items)
                    };
                } else {
                    return {
                        currentPage: page,
                        totalPages: Math.ceil(users.total_count/10),
                        loadedUsers: extractResponse(users.items)
                    };
                }
            }else return undefined;
        }
    );
};

const extractResponse = (array: Array<any>):Array<IUser> => {
    if (array.length!==0) return array.map(function (user: any) {
        return {
            id: user.id,
            username: user.login,
            avatarUrl: user.avatar_url,
            githubUrl: user.html_url,
            eventsUrl: user.events_url,
            reposUrl: user.repos_url,
        };
    });
    return [];
}