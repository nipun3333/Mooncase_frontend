import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DownArrow, EthIcon } from "../assets/icon";
import ModalLayout from "../modal/modal";
import { tokens } from "../utils/tokens";
import useWeb3 from "../utils/useWeb3";
import { convertUnit } from "./../utils/handleBigNumbers";
import { TextInputTransparent } from "./../components/styledComponents/Inputs";
import pools from "../utils/pools";

export default function WithdrawModal({ modalstate, setModalstate, data }) {
  
  // useEffect(() => {
  //   console.log(data)
  // }, [data])
    const web3 = useWeb3();

    const [showApproveButton, setshowApproveButton] = useState(true);

  const handleApprove = async () => {
    let tt = ["aDAI", "aUSDT", "aBUSD", "aWBTC"];
    let account = "";
    await web3.eth.getAccounts().then((accounts) => {
      // console.log(accounts, "Metamask Accounts");
      account = accounts[0];
    });
    let count = 0;
    if(account !== ''){
      
      for (let i = 0; i < tt.length; i++) {
        let contractAddress = tokens[tt[i]].address;
        let contractABI = require("./../abi/ERC20.json");
        let contract = new web3.eth.Contract(contractABI, contractAddress);
        await contract.methods
          .approve(
            process.env.REACT_APP_INVEST,
            "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
          )
          .send({ from: account })
          .then((result) => {
            // console.log(result, "Approve " + data[i].symbol);
            count++;

          });
      }
      if(count === data.length + 1){
        setshowApproveButton(false);
      }
    }
  }

  const handleWithdraw = async () => {
    let contractABI = require("./../abi/contract.json");
    let contractAddress = process.env.REACT_APP_INVEST;
    let contract = new web3.eth.Contract(contractABI, contractAddress);
    let account = "";
    await web3.eth.getAccounts().then((accounts) => {
      // console.log(accounts, "Metamask Accounts");
      account = accounts[0];
    });
    if(account !== ''){
        await contract.methods.withdraw(JSON.parse(JSON.stringify([["0xFF3c8bc103682FA918c954E84F5056aB4DD5189d","0x13512979ADE267AB5100878E2e0f485B568328a4","0xF4240","0x6774A9dA5152d9c4BF9c468f0748d191Ac146719"]])), account).send(
            { from: account }).on("recepit", (result) => {
              console.log(result, "Success");
            });
    
    }
  }

  return (
    <ModalLayout modalstate={modalstate} setModalstate={setModalstate}>
      
        <div className="p-10  ">
          <div className="border-b-2 pb-3" style={{ borderColor: "#606166" }}>
            <div className="justify-between flex" style={{ color: "#606166" }}>
              <p className="">Are you sure you want to withdraw your money?</p>
              
            </div>
            {
                showApproveButton ? <button
                className="w-full items-center justify-center flex border-2 rounded-xl p-2 mt-6 mb-2 green-button"
                style={{ borderColor: "#7AC131" }}
                onClick={() => {handleApprove()}}
              >
                Approve
              </button>: null
            }
          
          <button
            className="w-full items-center justify-center flex border-2 rounded-xl p-2 mt-6 mb-2 green-button"
            style={{ borderColor: "#7AC131" }}
            onClick={() => {handleWithdraw()}}
          >
            Withdraw
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
