/* eslint-disable import/no-anonymous-default-export */
import { SET_IS_WALLET_CONNECTED, SET_WALLET_ADDRESS, SET_WALLET_CHAIN } from "../actions/type";

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case SET_IS_WALLET_CONNECTED:
            return {
                ...state, 
                isWalletConnected: payload
              }
        case SET_WALLET_ADDRESS:
            return {
                ...state,
                walletAddress: payload
            }
        case SET_WALLET_CHAIN:
            return {
                ...state,
                walletChain: payload
            }
        default:
            return state;
    }
}