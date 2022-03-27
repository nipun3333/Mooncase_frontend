import React, { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import image from "./../assets/images/ImportanceofCorporateImage.jpg";
import GraphComp from "../pages/graph";
import Piechart from "../pages/piechartGraph";
import useWeb3 from "../utils/useWeb3";
import { getCaseDetailsApi } from "../api/CaseDetailsApi";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import BuyBucketModal from "../pages/buyModal";

export const Bucket = (props) => {
  const web3 = useWeb3();

  // Use Params
  let { id } = useParams();

  const [bucket, setBucket] = useState({
    bucketName: "Crypto Bucket",
    smallDesc:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. of the printing and typesetting industry. ",
    investmentAmount: "728",
  });
  const [tab, setTab] = useState("overview");
  const [coinDetail, setCoinDetail] = useState([]);
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const fetchCaseDetails = async () => {
    const result = await getCaseDetailsApi(id);
    if (result === false) {
      toast.warn(`Unable to fetch Bucket's details`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setBucket(result?.data?.arr);
    }
  };

  useEffect(() => {
    // var l = [];
    // for (var i = 0; i < 5; i++) {
    //   l.push({
    //     id: i,
    //     name: "Bitcoin",
    //     percentage: (i + 2) * 5,
    //     price: (i + 2) * 10,
    //   });
    // }
    // setCoinDetail(l);
    fetchCaseDetails();
  }, []);
  // All cards
  return (
    <Layout>
      <div>
        <div className="">
          <BuyBucketModal
            modalstate={openBuyModal}
            setModalstate={setOpenBuyModal}
            data={bucket?.coins}
          />
        </div>
        <div
          className="p-5 company-box rounded-xl"
          style={{ backgroundColor: "#1D2024" }}
        >
          <div className="flex justify-between gap-10">
            <div className="flex gap-10">
              <div>
                <img src={image} alt="" width={"160px"} height={"160px"} />
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-white text-3xl font-bold">
                  {bucket.bucketName}
                </h1>
                <h1 className="text-white text-lg w-3/4">
                  {bucket.caseDescription}
                </h1>
              </div>
            </div>

            <div className="">
              <div>
                <div className=" flex gap-5">
                  <button
                    className="cursor-pointer text-base p-2 rounded-md hov-dark-green2 w-full"
                    // style={{ backgroundColor: "#7AC131" }}
                    onClick={() => setOpenBuyModal(!openBuyModal)}
                  >
                    Invest
                  </button>
                  <button
                    className="cursor-pointer text-base p-2 rounded-md hov-dark-green2 w-full"
                    // style={{ backgroundColor: "#7AC131" }}
                  >
                    Withdraw
                  </button>
                </div>
                <div className="mt-5 flex flex-col gap-2 "></div>
              </div>
            </div>
          </div>
        </div>
        {/* tabs */}
        <div className="flex gap-5 mt-5">
          <div
            className="rounded-2xl p-4 cursor-pointer"
            style={
              tab === "overview"
                ? { background: "#1D2024" }
                : { color: "#606166" }
            }
            onClick={() => setTab("overview")}
          >
            Overview
          </div>
          <div
            className="rounded-2xl p-4 cursor-pointer"
            style={
              tab === "currency"
                ? { background: "#1D2024" }
                : { color: "#606166" }
            }
            onClick={() => setTab("currency")}
          >
            Currencies
          </div>
        </div>
        {tab === "overview" ? (
          <div className="mt-5 ml-auto">
            <GraphComp />
          </div>
        ) : (
          <div className="flex">
            <div className="flex flex-col gap-5 w-1/2 mt-5">
              <div
                className="grid grid-cols-2 p-5 rounded-2xl "
                style={{ color: "#7AC131" }}
              >
                <div className="font-extrabold text-2xl">{"Name"}</div>

                <div className="font-extrabold text-2xl ">{"Percentage"}</div>
              </div>
              {bucket?.coins.map((coin) => {
                return (
                  <div
                    className="grid grid-cols-2 p-5 rounded-2xl"
                    style={{ backgroundColor: "#1D2024" }}
                  >
                    <div>{coin.symbol}</div>
                    {/* <div className="justify-center flex items-center">
                      {coin.price}
                    </div> */}
                    <div>{coin.weight}</div>
                  </div>
                );
              })}
            </div>
            <div className="w-1/2">
              <div>
                <Piechart />
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer toastStyle={{ backgroundColor: "#000" }} />
    </Layout>
  );
};
