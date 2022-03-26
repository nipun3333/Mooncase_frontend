import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bucket } from "../components/bucket";
import Layout from "../components/layout/Layout";
import image from "./../assets/images/ImportanceofCorporateImage.jpg"

export const BucketList = () => {
  const [bucketList, setBucketList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    var l = [];
    for (var i = 0; i < 5; i++) {
      l.push({
        id: i,
        name: "Crypto" + i,
        desc: "Great description dsaf adwsfwwe wef ew Great description dsaf adwsfwwe wef ew Great description dsaf adwsfwwe wef ew Great description dsaf adwsfwwe wef ew Great description dsaf adwsfwwe wef ew",
        totalAvailableCurrencies: (i + 1) * 10,
        username: "user",
        type: "nft"
      });
    }
    setBucketList(l);
  }, []);

  // All cards
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-5 p-3 mx-10">
        {bucketList &&
          bucketList.map((bucket) => {
            return (
              <>
                <div className="bucket-card p-8 rounded-lg">

                  <div className="flex justify-center flex-col">
                    <div className="flex justify-between mb-4">
                      <div>
                        <img src={image} alt="" width={"80px"} height={"80px"} />
                      </div>
                      <div>
                        <p className="p-2 mx-auto bg-gray-800 rounded-md" style={{ color: "#bb86fc" }}>{bucket.type}</p>
                      </div>
                    </div>
                    <h1 className="text-xl text-white font-semibold">{bucket.name}</h1>
                    <p className="text-ss text-gray-400">{bucket.username}</p>
                    <p className="text-xs mt-2">{bucket.desc}</p>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </Layout>
  );
};
