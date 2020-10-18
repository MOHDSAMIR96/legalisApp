



export const addFriend = friendsIndex => (
  {
    type: 'ADD_FRIEND',
    payload: friendsIndex,
  }
);

export function storeUSerId(x){
    return {type: "USERID", doneAction: x }
}