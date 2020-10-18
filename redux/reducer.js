export const rootReducer = (state = { userId: 0}, action)=> {

    switch(action.type){

        case "USERID":
            return {...state, userId: action.doneAction}
         default:
            return state
    }
 }