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
  const location = useLocation();

  let walletChain = useSelector((state) => state.wallet.walletChain);
  let userChain = useSelector((state) => state.user.userChain);

  const [selectedOption, setselectedOption] = useState("/");

  const dispatch = useDispatch();
  // const [chain, setChain] = useState(userChain);

  const [switchWarning, setSwitchWarning] = useState(false);

  const HandleConnect = async () => {
    const web3 = await connectWeb3();

    const accounts = await web3.eth.getAccounts();
    // setaddress(accounts[0]);
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
    const url = location.pathname;

    if (url === "/") {
      setIsHome(true);
    } else if (url === "/bucketlist") {
      setIsBucketList(true);
    }
  }, []);

  useEffect(() => {
  }, [switchWarning]);

  return (
    <>
      <div className="ml-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div
              className={
                isHome
                  ? "activeNav py-auto cursor-pointer text-2xl"
                  : "py-auto cursor-pointer p-3 navTabs  text-2xl"
              }
              onClick={() => navigate("/")}
            >
              Moon Case
            </div>
            <div
              className={
                isBucketList
                  ? "activeNav py-auto cursor-pointer text-2xl"
                  : "cursor-pointer p-3 navTabs text-2xl"
              }
              onClick={() => navigate("/bucketlist")}
            >
              Bucket list
            </div>
          </div>

          <div className="flex gap-8 justify-end">
            {walletAddress && isWalletConnected ? (
              <div
              className="cursor-pointer text-base p-2 rounded-md hov-dark-green2 w-full"
                onClick={() => {
                  handleLogout();
                }}
              >
                {walletAddress.slice(0, 5) + "...." + walletAddress.slice(-4)}
              </div>
            ) : (
              <button
              className="cursor-pointer text-base p-2 rounded-md hov-dark-green2 w-full"
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