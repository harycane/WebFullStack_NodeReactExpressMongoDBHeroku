import axios from 'axios'; //to make ajax req
import { FETCH_USER } from './types';

//our action creator
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
  //usually
  //const requ = axios.get
  //return {type: fetch user, payload: requ}

  //putting the relative path only
  //make sure to put proxy rule in package json in client
};
