import React, { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import image from "./../assets/images/ImportanceofCorporateImage.jpg"

export const Bucket = (props) => {
  const [bucket, setBucket] = useState({
    bucketName: "Crypto Bucket",
    smallDesc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ",
    investmentAmount: "728",
  })
  // All cards
  return (
    <Layout>
      <div>
        <div className="p-5 company-box rounded-xl">
          <div className="flex gap-10">
            <div>
              <img src={image} alt="" width={"160px"} height={"160px"} />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-white text-3xl font-bold">{bucket.bucketName}</h1>
              <h1 className="text-white text-lg w-3/4">{bucket.smallDesc}</h1>
            </div>
          </div>

          <div className="mt-10">
            <div className="w-1/6">
              <div className="flex flex-col gap-2">
                <p>Amount for investment</p>
                <p className="text-xl font-semibold">₹ {bucket.investmentAmount}</p>
              </div>
              <div className="mt-4">
                <button className="cursor-pointer text-xl p-2 rounded-md hov-dark-green2 w-full">Invest</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};