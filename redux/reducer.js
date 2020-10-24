
const initialState = {userId: 0}


export const rootReducer = (state = initialState, action)=> {

    switch(action.type){

        case "USERID":
            return {...state, userId: action.doneAction}
         default:
            return state
    }
 }