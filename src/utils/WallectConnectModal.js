import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import Web3Modal from "web3modal";
import React, { useEffect, useState } from "react";

// In my BRAVE the modal is not showing up
//  I think this is the issue
// https://github.com/Web3Modal/web3modal/issues/173
// Modal Shows up in Private Window and Chrome

const getWeb3Modal = () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: process.env.REACT_APP_INFURA_ID,
      },
      display: {
        description: "Scan with a wallet to connect",
      },
    },
  };


  const web3Modal = new Web3Modal({
    // network: "mainnet", // optional
    cacheProvider: false, // optional
    providerOptions, // required
    // theme: {
    //     background: "rgb(39, 49, 56)",
    //     main: "rgb(199, 199, 199)",
    //     secondary: "rgb(136, 136, 136)",
    //     border: "rgba(195, 195, 195, 0.14)",
    //     hover: "rgb(16, 26, 32)"
    // },
    theme: "dark",
    disableInjectedProvider: false, // Forcing it to false becuase sometimes prevents the modal to show up
  });

  return web3Modal;
};

// Will have to write some logic to know that if the wallet is connected or not
const ConnectWeb3 = async () => {
  let web3Modal = await getWeb3Modal();

  var instance;
  const provider = await web3Modal.connect();
  instance = new Web3(provider);

  return instance;
};

export default ConnectWeb3;
