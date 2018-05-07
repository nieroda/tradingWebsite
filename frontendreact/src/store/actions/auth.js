import { SET_CURRENT_USER } from "../actionTypes"
import { apiCall, setTokenHeader } from "../../services/api"


export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}


export function setAuthorizationToken(token) {
  setTokenHeader(token)
}

export function logout() {
  return dispatch => {
    localStorage.clear()
    setAuthorizationToken(false)
    dispatch(setCurrentUser({}))
  }
}
