export default interface IUser {
    id: number;
    username: string;
    avatarUrl?: string;
    githubUrl: string;
    eventsUrl?: string;
    reposUrl: string;
    // textMatches: Array<IMatch>;
}

export interface IMatch{
    type?: string; // the type of value which matched the search string
    fragment?: string; // the part of the value matching the string
}