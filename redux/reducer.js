
const initialState = {userData: "", userMessages: []}


export const rootReducer = (state = initialState, action)=> {

    switch(action.type){

        case "USERDATA":
            return {...state, userData: action.doneAction}
        case "NEW_MESSAGE":
                    return {...state, userMessages: [...action.doneAction]}
         default:
            return state
    }
 }