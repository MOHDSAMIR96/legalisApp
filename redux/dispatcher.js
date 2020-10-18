import store from './store.js';
import {storeUSerId} from './actions';


export function changerUserIdDispatcher(x){
    store.dispatch(storeUSerId(x));
}