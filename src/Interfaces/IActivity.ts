export interface IPayload{
    commits?: Array<string>;
    action?: string;
}

export default interface IActivity{
    id: string;
    type: string;
    repo: string;
    isPublic: boolean;
    date: string;
}