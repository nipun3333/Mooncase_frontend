import {store} from '../store/store';

const checkConnection =  () => {
    return store.getState().wallet.isWalletConnected;
}

const SwitchNetwork = async (id, errorhandler) => {
    store.dispatch({
        type: 'SET_USER_CHAIN',
        payload: id
    })
    let isWalletConnected = await checkConnection();

    if(isWalletConnected){
        try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: id }],
            });
            // To show that the switch was successful
            return true;
          } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
              // Toastify that user does not have the chain added to MetaMask
            }
            // handle other "switch" errors
          }
    }
    // To show that the switch was unsuccessful
    return false;
}

export default SwitchNetwork;