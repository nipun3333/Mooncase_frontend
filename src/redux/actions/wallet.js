import { SET_WALLET_ADDRESS, SET_IS_WALLET_CONNECTED } from "./type";

export const setWalletAddress = (value, dispatch) => {
    dispatch({
        type: SET_WALLET_ADDRESS,
        payload: value
    });
}

export const setIsWalletConnected = (value, dispatch) => {
    dispatch({
        type: SET_IS_WALLET_CONNECTED,
        payload: value
    });
}

export const setWalletChain = (value, dispatch) => {
    dispatch({
        type: 'SET_WALLET_CHAIN',
        payload: value
    })
}