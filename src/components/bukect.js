import React, { useEffect, useState } from "react";

export const Bucket = (props) => {
  const [currenciesList, setCurrenciesList] = useState([]);
  const data = {
    id: "",
    about: "",
    avg: "",
    status: "",
  };
  useEffect(() => {
    var l = [];
    for (var i = 0; i < 5; i++) {
      l.push({
        id: i,
        name: "Currency " + i,
        desc: "currr",

        price: (i + 1) * 10,
      });
    }
    setCurrenciesList(l);
  });
  // All cards
  return (
    <>
      <div className="p-3 flex flex-col gap-4">
        <h1>List of currencies for bucket </h1>
        {currenciesList.map((currency) => {
          return (
            <div className="w-100 rounded-xl border-4 border-black flex justify-between p-3">
              <div>
                <p>{currency.name}</p>
                <p>{currency.desc}</p>
                <p>{currency.price}</p>
              </div>
              <div className=" flex gap-4">
                <button
                  className="bg-yellow-400"
                  style={{ width: "40px", height: "40px" }}
                >
                  Buy
                </button>
                <button
                  className="bg-green-600"
                  style={{ width: "40px", height: "40px" }}
                >
                  Sell
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
