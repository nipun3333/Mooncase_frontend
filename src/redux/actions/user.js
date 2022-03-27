import { SET_USER_CHAIN } from "./type"

export const setUserChain = (value, dispatch) => {
    dispatch({
        type: SET_USER_CHAIN,
        payload: value
    })
}