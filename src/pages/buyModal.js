import React, { useEffect, useState } from "react";
import { DownArrow, EthIcon } from "../assets/icon";
import ModalLayout from "../modal/modal";

export default function BuyBucketModal({ modalstate, setModalstate }) {
  const [currencyDropDown, setCurrencyDropDown] = useState(false);
  const [currencies, setCurrencies] = useState(["C1", "C2", "C3", "C4"]);
  const [curr, setCurr] = useState("DAI");
  const [val, setVal] = useState(0);
  const [totBal, setTotBal] = useState(95.992);
  const [curList, setCurList] = useState([{ name: "SPC", nowBal: 68.032 }]);
  useEffect(() => {
    var l = [];
    for (var i = 0; i < 5; i++) {
      l.push({
        name: "SPC",
        nowBal: 68.032,
        curAmt: 2.46,
      });
    }
    setCurList(l);
  }, []);

  return (
    <ModalLayout modalstate={modalstate} setModalstate={setModalstate}>
      <div>
        <div className="p-10  ">
          <div className="border-b-2 pb-3" style={{ borderColor: "#606166" }}>
            <div className="justify-between flex" style={{ color: "#606166" }}>
              <p className="">Currency</p>
              <p className="">Balance: {totBal}</p>
            </div>
            <div className="justify-between flex mt-3 p-2 items-center">
              <div className="flex gap-3">
                <EthIcon />
                <p className="">{curr}</p>
              </div>

              <p className="cursor-pointer rounded-2xl border-blue-500 border-2 p-2 text-blue-500">
                MAX
              </p>
              <p className="">{val}</p>
            </div>
          </div>

          {curList &&
            curList.map((curCrypto) => {
              return (
                <div
                  className="border-b-2 pb-3 mt-2 "
                  style={{ borderColor: "#606166" }}
                >
                  <div
                    className="justify-between flex"
                    style={{ color: "#606166" }}
                  >
                    <p className="">Launch Token</p>
                    <p className="">Balance: {curCrypto.nowBal}</p>
                  </div>
                  <div className="justify-between flex mt-3 p-2 items-center">
                    <div className="flex gap-3">
                      <EthIcon />
                      <p className="">{curCrypto.name}</p>
                    </div>

                    <p className="font-semibold text-3xl">{curCrypto.curAmt}</p>
                  </div>
                </div>
              );
            })}
          <button
            className="w-full items-center justify-center flex border-2 rounded-xl p-2 mt-6 mb-2 green-button"
            style={{ borderColor: "#7AC131" }}
          >
            BUY
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
