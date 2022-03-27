
import { useEffect, useState } from "react";
import Web3 from "web3";


// We can not use the infura provider everytime
// because web3.eth.getAccounts() on work with metamask provider

const useWeb3 = () => {
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    var instance;

    if (window.ethereum) {
      // set up a new provider
      try {
        instance = new Web3(window.ethereum);
      } catch (error) {
        console.error(error);
      }

    } else {
      // fallback on localhost provider
      const provider = new Web3.providers.HttpProvider(
        "https://kovan.infura.io/v3/" + process.env.REACT_APP_INFURA_ID
      );
      instance = new Web3(provider);

    }
    setWeb3(instance);
  }, []);
  return web3;
};

export default useWeb3;
