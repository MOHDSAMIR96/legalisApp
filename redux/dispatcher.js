import store from './store.js';
import {storeUSerId} from './actions';
import {storeNewMessage} from './actions';


export function changerUserIdDispatcher(x){
    store.dispatch(storeUSerId(x));
}

export function pushAnotherMessage(x){
    store.dispatch(storeNewMessage(x));
}