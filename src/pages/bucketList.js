import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";


export const BucketList = () => {
  const [bucketList, setBucketList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    var l = [];
    for (var i = 0; i < 5; i++) {
      l.push({
        id: i,
        name: "Stock" + i,
        desc: "Great",
        totalAvailableCurrencies: (i + 1) * 10,
      });
    }
    setBucketList(l);
  }, []);

  // All cards
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-3 p-3">
        {bucketList &&
          bucketList.map((bucket) => {
            return (
              <div
                className="cursor-pointer p-3 justify-center items-center rounded-lg border-2 "
                onClick={() => navigate("/bucket")}
              >
                <p>{bucket.name}</p>
                <p>{bucket.desc}</p>
                <p>{bucket.totalAvailableCurrencies}</p>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};
