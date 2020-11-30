
const initialState = {userData: "", userMessages: [], selectedCase: ""}


export const rootReducer = (state = initialState, action)=> {

    switch(action.type){

        case "USERDATA":
            return {...state, userData: action.doneAction}
        case "SELECTED_CASE":
                    return {...state, selectedCase: action.doneAction}
        case "NEW_MESSAGE":
                    return {...state, userMessages: [...action.doneAction]}
         default:
            return state
    }
 }