import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bucket } from "../components/bukect";
import img from "../assets/images/ImportanceofCorporateImage.jpg";
export const BucketList = () => {
  const [bucketList, setBucketList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    var l = [];
    for (var i = 0; i < 5; i++) {
      l.push({
        id: i,
        name: "Stock" + i,
        desc: "Great description dsaf adwsfwwe wef ew",
        totalAvailableCurrencies: (i + 1) * 10,
      });
    }
    setBucketList(l);
  }, []);

  // All cards
  return (
    <>
      <div className="grid grid-cols-3 gap-3 p-3 page-contain">
        {bucketList &&
          bucketList.map((bucket) => {
            return (
              <>
                {/* <div
                className="cursor-pointer p-3 justify-center items-center rounded-lg border-2 "
                onClick={() => navigate("/bucket")}
              >
                <p>{bucket.name}</p>
                <p>{bucket.desc}</p>
                <p>{bucket.totalAvailableCurrencies}</p>
              </div> */}
                {/* <a> */}
                <div
                  className="data-card cursor-pointer"
                  onClick={() => navigate("/bucket")}
                >
                  {/* <h3>270</h3> */}
                  <img src={img} alt="" />
                  <h3>{bucket.name}</h3>
                  <p>{bucket.desc}</p>
                  {/* <p>Aenean lacinia bibendum nulla sed consectetur.</p> */}
                  <span class="link-text">Click to View</span>
                </div>
                {/* </a> */}
              </>
            );
          })}
      </div>
    </>
  );
};
