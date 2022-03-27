import React, { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import image from "./../assets/images/ImportanceofCorporateImage.jpg";
import GraphComp from "../pages/graph";
import Piechart from "../pages/piechartGraph";
import BuyBucketModal from "../pages/buyModal";

export const Bucket = (props) => {
  const [bucket, setBucket] = useState({
    bucketName: "Crypto Bucket",
    smallDesc:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. of the printing and typesetting industry. ",
    investmentAmount: "728",
  });
  const [tab, setTab] = useState("overview");
  const [coinDetail, setCoinDetail] = useState([]);
  const [openBuyModal, setOpenBuyModal] = useState(false);
  useEffect(() => {
    var l = [];
    for (var i = 0; i < 5; i++) {
      l.push({
        id: i,
        name: "Bitcoin",
        percentage: (i + 2) * 5,
        price: (i + 2) * 10,
      });
    }
    setCoinDetail(l);
  }, []);
  // All cards
  return (
    <Layout>
      <div>
        <div className="">
          <BuyBucketModal
            modalstate={openBuyModal}
            setModalstate={setOpenBuyModal}
          />
        </div>
        <div
          className="p-5 company-box rounded-xl"
          style={{ backgroundColor: "#2A2B31" }}
        >
          <div className="flex justify-between">
            <div className="flex gap-8">
              <div className="w-3/12">
                <img src={image} alt="" style={{ maxHeight: "200px" }} />
              </div>
              <div className="flex flex-col gap-3 mr-3 w-9/12">
                <h1 className="text-white text-3xl font-bold">
                  {bucket.bucketName}
                </h1>
                <h1 className=" text-lg " style={{ color: "#4C4D55" }}>
                  {bucket.smallDesc}
                </h1>
              </div>
            </div>

            <div className="">
              <div>
                <div className=" flex gap-5">
                  <button
                    className="cursor-pointer text-xl p-2 rounded-md hov-dark-green2 w-full"
                    style={{ backgroundColor: "#7AC131" }}
                    onClick={() => setOpenBuyModal(!openBuyModal)}
                  >
                    Invest
                  </button>
                  <button
                    className="cursor-pointer text-xl p-2 rounded-md hov-dark-green2 w-full"
                    style={{ backgroundColor: "#7AC131" }}
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
                ? { background: "#4C4D55" }
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
                ? { background: "#4C4D55" }
                : { color: "#606166" }
            }
            onClick={() => setTab("currency")}
          >
            Currencies
          </div>
        </div>
        {tab === "overview" ? (
          <div className="mt-5">
            <GraphComp />
          </div>
        ) : (
          <div className="flex">
            <div className="flex flex-col gap-5 w-1/2 mt-5">
              <div
                className="grid grid-cols-3 p-5 rounded-2xl text-center"
                style={{ color: "#7AC131" }}
              >
                <div className="font-extrabold text-2xl text-center">
                  {"Name"}
                </div>
                <div className="font-extrabold text-2xl text-center">
                  {"Price"}
                </div>
                <div className="font-extrabold text-2xl text-center">
                  {"Percentage"}
                </div>
              </div>
              {coinDetail.map((coin) => {
                return (
                  <div
                    className="grid grid-cols-3 p-5 rounded-2xl"
                    style={{ backgroundColor: "#2A2B31" }}
                  >
                    <div className="text-center" style={{ color: "#FFFFFF" }}>
                      {coin.name}
                    </div>
                    <div className="text-center" style={{ color: "#7AC231" }}>
                      {coin.price}
                    </div>
                    <div className="text-center" style={{ color: "#FFFFFF" }}>
                      {coin.percentage}
                    </div>
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
    </Layout>
  );
};
