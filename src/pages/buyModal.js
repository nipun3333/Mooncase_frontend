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

export default function BuyBucketModal({ modalstate, setModalstate, data }) {
  
  const [wethBal, setwethBal] = useState(false);
  const isWalletConnected = useSelector(
    (state) => state.wallet.isWalletConnected
  );
  const [tokenAmount, settokenAmount] = useState(0);
  const [tokenAmountError, settokenAmountError] = useState(false);

  const web3 = useWeb3();

  const walletAddress = useSelector((state) => state.wallet.walletAddress);

  const fetchBalances = async () => {
    let contractABI = require("./../abi/ERC20.json");
    let wethAddress = tokens["WETH"].address;

    let wethContract = new web3.eth.Contract(contractABI, wethAddress);
    await wethContract.methods.balanceOf(walletAddress).call().then((res) => {
      let bal = new BigNumber(res);
      setwethBal(bal);
    })


    if (!(data?.length > 0)) {
      return;
    }

    let balances = [];

    for (let i = 0; i < data.length; i++) {
      let contract = new web3.eth.Contract(
        contractABI,
        tokens[data[i].symbol].address
      );
      await contract.methods
        .balanceOf(walletAddress)
        .call()
        .then((res) => {
          let bal = new BigNumber(res);
          let temp = curList[i];
          balances.push({
            ...temp,
            nowBal: bal,
          });
        });
    }
    setCurList(balances);
  };

  useEffect(() => {
    if (web3 && web3.version && isWalletConnected && data?.length > 0) {
      console.log(web3.version);
      fetchBalances();
    }
  }, [web3, data, isWalletConnected]);

  const [curr, setCurr] = useState("WETH");
  const [val, setVal] = useState(0);
  const [totBal, setTotBal] = useState(95.992);
  const [curList, setCurList] = useState([{}]);
  useEffect(() => {
    if (data) {
      var l = [];
      for (var i = 0; i < data.length; i++) {
        l.push({
          name: data[i].symbol,
          nowBal: 68.032,
          curAmt: data[i].weight,
        });
      }
      setCurList(l);
    }
  }, [data, modalstate]);

  const showBalance = (data, decimals = 18) => {
    // console.log(data);
    if (data) {
      return convertUnit(data, "divide", decimals).toFixed(4).toString();
    }
    return "0.00";
  };

  const handleTokenAmountChange = (amount) => {
    console.log(amount, "Called");
    let change = convertUnit(amount, "multiply", 18);
    // console.log(change.toString(), "change");
    if (change.isGreaterThan(wethBal)) {
    
      settokenAmountError(true);
    } else {
      settokenAmountError(false);
    }
  };

  const [showApproveButton, setshowApproveButton] = useState(true);

  const approveTokenAllowance = async () => {
    
    let account = "";
    await web3.eth.getAccounts().then((accounts) => {
      // console.log(accounts, "Metamask Accounts");
      account = accounts[0];
    });
    let count = 0;
    if(account !== ''){
      console.log("Was here", account)
      let contractAddress = tokens["WETH"].address;
      let contractABI = require("./../abi/ERC20.json");
      let contract = new web3.eth.Contract(contractABI, contractAddress);
      await contract.methods
      .approve(
        process.env.REACT_APP_INVEST,
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
      )
      .send({ from: account })
      .then((result) => {
        console.log(result, "Approve WETH");
        count++;
      });
      for (let i = 0; i < data.length; i++) {
        let contractAddress = data[i].contract;
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
         
  };

  const handleDeposit = async () => {
    let contractABI = require("./../abi/contract.json");
    let contractAddress = process.env.REACT_APP_INVEST;
    let contract = new web3.eth.Contract(contractABI, contractAddress);
    let account = "";
    await web3.eth.getAccounts().then((accounts) => {
      // console.log(accounts, "Metamask Accounts");
      account = accounts[0];
    });
    if(account !== ''){
      let final = [];
      
      for(let i=0; i<data.length; i++){
        let singleswap = [
          pools(data[i].symbol),
          0,
          tokens["WETH"].address,
          data[i].contract,
          web3.utils.toHex(convertUnit(tokenAmount*parseFloat(data[i].weight), "multiply", 18-2).toString()),
          "0x"
        ]
        console.log(tokenAmount, parseFloat(data[i].weight), tokens[data[i].symbol].decimals-2, "Token Amount");
        console.log(convertUnit(tokenAmount*parseFloat(data[i].weight), "multiply", tokens[data[i].symbol].decimals-2).toString(), "singleswap")

        let fundmanagement = [
          process.env.REACT_APP_INVEST,
          false,
          process.env.REACT_APP_INVEST,
          false,
        ]

        final.push([singleswap, fundmanagement, 0, 
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        ]);

      }
      console.log(final, account);
      try {
        await contract.methods.deposit(JSON.parse(JSON.stringify(final)), account).send(
          { from: account }).on("recepit", (result) => {
            console.log(result, "Success");
          });
      }catch(e){
        console.log(e); 
      }
    }
  }

  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  return (
    <ModalLayout modalstate={modalstate} setModalstate={setModalstate}>
      <div>
        <div className="p-10  ">
          <div className="border-b-2 pb-3" style={{ borderColor: "#606166" }}>
            <div className="justify-between flex" style={{ color: "#606166" }}>
              <p className="">Currency</p>
              <p className="">Balance: {showBalance(wethBal)}</p>
            </div>
            <div className="justify-between flex mt-3 p-2 items-center">
              <div className="flex gap-3">
                <EthIcon />
                <p className="">{curr}</p>
              </div>

              <p className="cursor-pointer rounded-2xl border-blue-500 border-2 p-2 text-blue-500"
                onClick={(e) => {
                  e.preventDefault();
                  settokenAmount(
                    showBalance(
                      parseFloat(wethBal),
                      18
                    )
                  );
                }}
              >
                MAX
              </p>
              {/* <p className="">{val}</p>
               */}
              <TextInputTransparent
                width="60%"
                placeholder={0.0}
                className="text-sm"
                id="tokenAmount"
                value={tokenAmount}
                onChange={(e) =>
                  // Note: handle if the input is not a number
                  {
                    if (e.target.value === "" || isNaN(e.target.value)) {
                      settokenAmount(0);
                      handleTokenAmountChange(0);
                    } else {
                      // let val = web3.utils.toWei(e.target.value, "ether");
                      settokenAmount(e.target.value);
                      handleTokenAmountChange(e.target.value);
                    }
                  }
                }
              />
            </div>
          </div>

          {curList &&
            curList.map((curCrypto) => {
              return (
                <div
                  className="border-b-2 pb-3 mt-2 "
                  style={{ borderColor: "#606166" }}
                >
                  <div
                    className="justify-between flex"
                    style={{ color: "#606166" }}
                  >
                    <p className="">Launch Token</p>
                    <p className="">Balance: {
                      curCrypto.name === "WBTC" ? 
                    showBalance(curCrypto.nowBal, 8) :
                    curCrypto.name === 'USDT' ? 
                    showBalance(curCrypto.nowBal, 6) :
                    showBalance(curCrypto.nowBal, 18)
                    
                    }</p>
                  </div>
                  <div className="justify-between flex mt-3 p-2 items-center">
                    <div className="flex gap-3">
                      <EthIcon />
                      <p className="">{curCrypto.name}</p>
                    </div>

                    <p className="font-semibold text-2xl">{curCrypto.curAmt}%</p>
                  </div>
                </div>
              );
            })}
            {
              showApproveButton ? <button className='w-full items-center justify-center flex border-2 rounded-xl p-2 mt-6 mb-2'
                onClick={() => approveTokenAllowance()}
              >
                Approve
              </button> : null
            }
          <button
            className="w-full items-center justify-center flex border-2 rounded-xl p-2 mt-6 mb-2 green-button"
            style={{ borderColor: "#7AC131" }}
            onClick={() => {handleDeposit()}}
          >
            BUY
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
