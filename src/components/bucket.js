import React, { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import image from "./../assets/images/ImportanceofCorporateImage.jpg";
import GraphComp from "../pages/graph";
import Piechart from "../pages/piechartGraph";

export const Bucket = (props) => {
  const [bucket, setBucket] = useState({
    bucketName: "Crypto Bucket",
    smallDesc:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ",
    investmentAmount: "728",
  });
  const [tab, setTab] = useState("overview");
  const [coinDetail, setCoinDetail] = useState([]);

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
        <div
          className="p-5 company-box rounded-xl"
          style={{ backgroundColor: "#65656A" }}
        >
          <div className="flex gap-10">
            <div>
              <img src={image} alt="" width={"160px"} height={"160px"} />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-white text-3xl font-bold">
                {bucket.bucketName}
              </h1>
              <h1 className="text-white text-lg w-3/4">{bucket.smallDesc}</h1>
            </div>
          </div>

          <div className="mt-10">
            <div className="w-1/6">
              <div className="flex flex-col gap-2">
                <p>Amount for investment</p>
                <p className="text-xl font-semibold">
                  ₹ {bucket.investmentAmount}
                </p>
              </div>
              <div className="mt-4 flex gap-5">
                <button className="cursor-pointer text-xl p-2 rounded-md hov-dark-green2 w-full">
                  Invest
                </button>
                <button className="cursor-pointer text-xl p-2 rounded-md hov-dark-green2 w-full">
                  Withdraw
                </button>
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
                className="flex justify-between p-5 rounded-2xl"
                style={{ backgroundColor: "#2A2B31", color: "#7AC131" }}
              >
                <div>{"Name"}</div>
                <div>{"price"}</div>
                <div>{"percentage"}</div>
              </div>
              {coinDetail.map((coin) => {
                return (
                  <div
                    className="flex justify-between p-5 rounded-2xl"
                    style={{ backgroundColor: "#2A2B31", color: "#7AC131" }}
                  >
                    <div>{coin.name}</div>
                    <div className="justify-center flex items-center">
                      {coin.price}
                    </div>
                    <div>{coin.percentage}</div>
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
