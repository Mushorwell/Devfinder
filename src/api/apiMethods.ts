// shared fetch api methods that can be reused for making calls
// function to make an api call to an endpoint
import IUrlParams from "../Interfaces/IUrlParameters";

export const githubAPIBaseUrl = 'https://api.github.com';

export async function makeAPICall(url: string, parameters: RequestInit | undefined): Promise<any>{
    try{
        const response = await fetch( url, parameters);
        return await response.json();
    }catch (error){
        console.error(error);
    }
}

// function to construct the api url with the base url, action parameter and query string
export const getApiUrl = ({destinationUrl, action, queryString}: IUrlParams): string => {
    let searchVal = null ?? queryString;
    // console.log(searchVal);
    return destinationUrl + action + searchVal;
}

export {}