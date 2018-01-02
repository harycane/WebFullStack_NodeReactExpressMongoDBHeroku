import { FETCH_USER } from '../actions/types';
//exporting the reducer
//state=null means we are awaiting the req to check whether the user is logged in or not
export default function(state = null, action) {
  //state is undefined hence give it an empty obj initialization
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
