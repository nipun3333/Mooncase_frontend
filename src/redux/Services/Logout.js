import {store } from './../store/store';
import { SET_WALLET_ADDRESS } from '../actions/type';


const handleLogout = () => {
    store.dispatch({
        type: SET_WALLET_ADDRESS,
        payload: ''
    });
    store.dispatch({
        type: 'SET_IS_WALLET_CONNECTED',
        payload: false
    })
    store.dispatch({
        type: "SET_WALLET_CHAIN",
        payload: ''
    })
}

export default handleLogout;