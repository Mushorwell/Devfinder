import { createStore } from 'redux';
import { rootReducer } from "./appState";

const configureStore = () => {
    return createStore( rootReducer, {});
}

export default configureStore;