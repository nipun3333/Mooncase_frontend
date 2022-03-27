import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import connectWeb3 from "../../utils/WallectConnectModal";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  setIsWalletConnected,
  setWalletAddress,
  setWalletChain,
} from "../../redux/actions/wallet";
import SwitchNetwork from "../../redux/Services/SwitchNetwork";
import useWeb3 from "../../utils/useWeb3";
import { useNavigate } from "react-router-dom";
import handleLogout from "./../../redux/Services/Logout";

export default function Header() {
  const [isHome, setIsHome] = useState(false);
  const [isBucketList, setIsBucketList] = useState(false);
  useEffect(() => {
    const url = window.location.href;
    console.log(url);
    if (url === "/") {
      setIsHome(true);
    } else if (url === "/bucketlist") {
      setIsBucketList(true);
    }
  }, []);
  const navigate = useNavigate();

  let walletAddress = useSelector((state) => state.wallet.walletAddress);
  let isWalletConnected = useSelector(
    (state) => state.wallet.isWalletConnected
  );
  // console.log(props.location);
  const location = useLocation();

  let walletChain = useSelector((state) => state.wallet.walletChain);
  let userChain = useSelector((state) => state.user.userChain);

  const [selectedOption, setselectedOption] = useState("/");

  const dispatch = useDispatch();
  // const [chain, setChain] = useState(userChain);

  const [switchWarning, setSwitchWarning] = useState(false);

  const HandleConnect = async () => {
    console.log("Made it to HandleConnect");
    const web3 = await connectWeb3();

    const accounts = await web3.eth.getAccounts();
    // setaddress(accounts[0]);
    console.log("accounts", accounts);
    setWalletAddress(accounts[0], dispatch);
    setIsWalletConnected(true, dispatch);
    web3.eth.getChainId().then((id) => {
      // setChain(id);
      // alert(id)
      setWalletChain("0x" + id.toString(16), dispatch);
    });
  };

  const web3 = useWeb3();

  const checkConnection = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("accounts was called", accounts);
    if (accounts.length === 0) {
      setIsWalletConnected(false, dispatch);
    }
  };

  useEffect(() => {
    if (isWalletConnected) {
      if (web3 && web3.version) {
        checkConnection();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3]);

  // This code will listen for changes in the network in metamask
  useEffect(() => {
    if (isWalletConnected && window.ethereum) {
      window.ethereum.on("chainChanged", (chainId) => {
        // setChain(chainId);
        setWalletChain(chainId, dispatch);
      });
    }
  }, [isWalletConnected]);

  const handleWarningSwitchNetwork = () => {
    SwitchNetwork(userChain);
  };

  useEffect(() => {
    console.log(location.pathname);
    const url = location.pathname;

    if (url === "/") {
      setIsHome(true);
    } else if (url === "/bucketlist") {
      setIsBucketList(true);
    }
  }, []);

  useEffect(() => {
    console.log("switchWarning", switchWarning);
  }, [switchWarning]);

  return (
    <>
      <div className="ml-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div
              className={
                isHome
                  ? "activeNav py-auto cursor-pointer"
                  : "py-auto cursor-pointer p-3 navTabs"
              }
              onClick={() => navigate("/")}
            >
              Moon Case
            </div>
            <div
              className={
                isBucketList
                  ? "activeNav py-auto cursor-pointer"
                  : "cursor-pointer p-3 navTabs"
              }
              onClick={() => navigate("/bucketlist")}
            >
              Bucket list
            </div>
          </div>

          <div>🚀🌕🚀</div>

          <div className="flex gap-8 justify-end">
            {walletAddress && isWalletConnected ? (
              <div
                className="py-3 px-4 hov-dark-green1 rounded-2xl flex justify-between items-center w-40 cursor-pointer"
                onClick={() => {
                  handleLogout();
                }}
              >
                {walletAddress.slice(0, 5) + "...." + walletAddress.slice(-4)}
              </div>
            ) : (
              <button
                className="cursor-pointer p-3 rounded-md hov-dark-green1 "
                onClick={() => HandleConnect()}
              >
                Connect
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// import { Button } from "../styledComponents/Buttons/index";
// import SelectInput from "./SelectInput";
// import Logo from "../../assets/images/logo.svg";
// import { Link, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import connectWeb3 from "../../utils/WallectConnectModal";
// import { useSelector, useDispatch, connect } from "react-redux";
// import {
//   setIsWalletConnected,
//   setWalletAddress,
//   setWalletChain,
// } from "../../redux/actions/wallet";
// import { Power } from "../../assets/icon";
// import handleLogout from "../../redux/Services/Logout";
// import SwitchNetworkMessage from "./SwitchNetworkMessage";
// import SwitchNetwork from "../../redux/Services/SwitchNetwork";
// import useWeb3 from "../../utils/useWeb3";

// function Header(props) {
//   let walletAddress = useSelector((state) => state.wallet.walletAddress);
//   let isWalletConnected = useSelector(
//     (state) => state.wallet.isWalletConnected
//   );
//   // console.log(props.location);
//   const location = useLocation();

//   let walletChain = useSelector((state) => state.wallet.walletChain);
//   let userChain = useSelector((state) => state.user.userChain);

//   const [selectedOption, setselectedOption] = useState("/");

//   const dispatch = useDispatch();
//   // const [chain, setChain] = useState(userChain);

//   const [switchWarning, setSwitchWarning] = useState(false);

//   const HandleConnect = async () => {
//     console.log("Made it to HandleConnect");
//     const web3 = await connectWeb3();

//     const accounts = await web3.eth.getAccounts();
//     // setaddress(accounts[0]);
//     console.log("accounts", accounts);
//     setWalletAddress(accounts[0], dispatch);
//     setIsWalletConnected(true, dispatch);
//     web3.eth.getChainId().then((id) => {
//       // setChain(id);
//       // alert(id)
//       setWalletChain("0x" + id.toString(16), dispatch);
//     });
//   };

//   const web3 = useWeb3();

//   const checkConnection = async () => {
//     const accounts = await web3.eth.getAccounts();
//     console.log("accounts was called", accounts);
//     if (accounts.length === 0) {
//       setIsWalletConnected(false, dispatch);
//     }
//   };

//   useEffect(() => {
//     if (isWalletConnected) {
//       if (web3 && web3.version) {
//         checkConnection();
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [web3]);

//   // This code will listen for changes in the network in metamask
//   useEffect(() => {
//     if (isWalletConnected && window.ethereum) {
//       window.ethereum.on("chainChanged", (chainId) => {
//         // setChain(chainId);
//         setWalletChain(chainId, dispatch);
//       });
//     }
//   }, [isWalletConnected]);

//   const handleWarningSwitchNetwork = () => {
//     SwitchNetwork(userChain);
//   };

//   useEffect(() => {
//     console.log(location.pathname);
//   }, []);

//   useEffect(() => {
//     console.log("switchWarning", switchWarning);
//   }, [switchWarning])

//   return (
//     <>
//       {switchWarning ? (
//         <SwitchNetworkMessage
//           warningSwitchNetwork={handleWarningSwitchNetwork}
//         />
//       ) : null}

//       <div className="bg-header px-8 py-6 items-center flex justify-between">
//         <div className="flex gap-6 text-white">
//           <Link
//             to="/"
//             style={{
//               color: location.pathname === "/" ? "#F70FE8" : "#FFFFFF",
//             }}
//           >
//             Copper
//           </Link>
//           <Link
//             to="/auction"
//             style={{
//               color: location.pathname === "/auction" ? "#F70FE8" : "white",
//             }}
//           >
//             Auctions
//           </Link>
//           <Link
//             to="/contactus"
//             style={{
//               color: location.pathname === "/contactus" ? "#f70fe8" : "#fff",
//             }}
//           >
//             Contact Us
//           </Link>
//           <p>Docs</p>
//         </div>
//         <div>
//           <img src={Logo} alt="" className="h-10" />
//         </div>

//         <div className="flex gap-6">
//           <SelectInput
//             width="180px"
//             // updateTheChain={walletChain}
//             setSwitchWarning={setSwitchWarning}
//           ></SelectInput>
//           {walletAddress && isWalletConnected ? (
//             <div
//               className="py-3 px-4 bg-primary rounded-2xl flex justify-between items-center w-40 cursor-pointer"
//               onClick={() => {
//                 handleLogout();
//               }}
//             >
//               {walletAddress.slice(0, 5) + "...." + walletAddress.slice(-4)}
//               <Power />
//             </div>
//           ) : (
//             <Button
//               width="180px"
//               onClick={() => {
//                 HandleConnect();
//               }}
//             >
//               Connect
//             </Button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default connect()(Header);
