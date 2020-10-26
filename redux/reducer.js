
const initialState = {userData: ""}


export const rootReducer = (state = initialState, action)=> {

    switch(action.type){

        case "USERDATA":
            return {...state, userData: action.doneAction}
         default:
            return state
    }
 }