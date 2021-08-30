import IUser, {IUserList} from "../../Interfaces/IUser";
import {useDispatch} from "react-redux";

type ActionType = string;
type ActionPayload = IUserList | string | boolean | Array<IUser>;


export default function useDispatchReduxAction (type: ActionType, payload: ActionPayload){

    const storeDispatch = useDispatch();

    storeDispatch({
        type:type,
        payload: payload
    });
    console.log('Updating state using action:', type);
}