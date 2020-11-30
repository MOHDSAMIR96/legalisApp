import store from './store.js';
import {storeUSerId} from './actions';
import {storeNewMessage} from './actions';
import {storeSelectedCase} from './actions';


export function changerUserIdDispatcher(x){
    store.dispatch(storeUSerId(x));
}

export function pushAnotherMessage(x){
    store.dispatch(storeNewMessage(x));
}

export function dispatchSelectCase(x){
    store.dispatch(storeSelectedCase(x));
}