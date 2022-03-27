/* eslint-disable import/no-anonymous-default-export */

import { SET_USER_CHAIN } from "../actions/type";

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case SET_USER_CHAIN:
            return {
                ...state,
                userChain: payload
            }
        default:
            return state;
    }
}