import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bucket } from "../components/bucket";
import Layout from "../components/layout/Layout";
import image from "./../assets/images/ImportanceofCorporateImage.jpg";
import { toast, ToastContainer } from "react-toastify";
import { Plus } from "./../assets/icon";
import ModalLayout from "../modal/modal";
import Modal from "react-modal";
import CreateBucketModal from "./createBucketModal";
import { getCasesApi } from "../api/GetCases";

Modal.setAppElement("#root");

export const BucketList = () => {
  const [bucketList, setBucketList] = useState([]);
  const navigate = useNavigate();
  const [addBucketModal, setAddBucketModal] = useState(false);

  const fetchBuckets = async () => {
    const result = await getCasesApi(3);
    if (result === false) {
      toast.warn(`Unable to Create Bucket's at the moment`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setBucketList(result?.data?.arr);
    }
  }

  const [bucketTypes, setBucketTypes] = useState([
    { name: "NFTs", type: "nft" },
    { name: "Metaverse", type: "metaverse" }
  ])

  useEffect(() => {

    fetchBuckets();
  }, []);

  // All cards
  return (
    <Layout>
      <CreateBucketModal
        modalstate={addBucketModal}
        setModalstate={setAddBucketModal}
      />
      <div className="mt-14 mb-8 flex justify-between">
        <div className="">
          <h1 className="text-5xl font-bold">Buckets</h1>
        </div>
        <div>
          <button
            className="cursor-pointer text-base rounded-md hov-dark-green2-small w-full"
            onClick={() => setAddBucketModal(true)}
          >
            Add Bucket
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 p-3 mx-10 border-b-2 border-gray-600 pb-10">
        {bucketList &&
          bucketList.map((bucket) => {
            return (
              <>
                <div
                  className="bucket-card p-8 rounded-lg cursor-pointer"
                  onClick={() => {
                    navigate("/bucket/" + bucket._id);
                  }}
                >
                  <div className="flex justify-center flex-col">
                    <div className="flex justify-between mb-4">
                      <div>
                        <img
                          src={image}
                          alt=""
                          width={"80px"}
                          height={"80px"}
                        />
                      </div>
                      <div>
                        <p
                          className="p-2 mx-auto bg-gray-800 rounded-md"
                          style={{ color: "#bb86fc" }}
                        >
                          {bucket.type}
                        </p>
                      </div>
                    </div>
                    <h1 className="text-xl text-white font-semibold">
                      {bucket.bucketName}
                    </h1>
                    <div
                      className="items-center cursor-pointer"
                    >
                      {bucket.creatorAddress.slice(0, 5) + "...." + bucket.creatorAddress.slice(-4)}

                    </div>
                    <p className="text-xs mt-2">{bucket.caseDescription}</p>
                  </div>
                </div>
              </>
            );
          })}
      </div>

      <div>


        <div>
          {bucketTypes.map((typ) => {
            return (

              <div className="mt-14">
                <h1 className="text-3xl">{typ.name}</h1>
                <div className="grid grid-cols-3 gap-5 p-3 mx-10 border-b-2 border-gray-600 pb-10">
                  {
                    bucketList.map((bucket) => {
                      if (bucket.type == typ.type) {
                        return (
                          <>
                            <div
                              className="bucket-card p-8 rounded-lg cursor-pointer"
                              onClick={() => {
                                navigate("/bucket/" + bucket._id);
                              }}
                            >
                              <div className="flex justify-center flex-col">
                                <div className="flex justify-between mb-4">
                                  <div>
                                    <img
                                      src={image}
                                      alt=""
                                      width={"80px"}
                                      height={"80px"}
                                    />
                                  </div>
                                  <div>
                                    <p
                                      className="p-2 mx-auto bg-gray-800 rounded-md"
                                      style={{ color: "#bb86fc" }}
                                    >
                                      {bucket.type}
                                    </p>
                                  </div>
                                </div>
                                <h1 className="text-xl text-white font-semibold">
                                  {bucket.bucketName}
                                </h1>
                                <div
                                  className="items-center cursor-pointer"
                                >
                                  {bucket.creatorAddress.slice(0, 5) + "...." + bucket.creatorAddress.slice(-4)}

                                </div>
                                <p className="text-xs mt-2">{bucket.caseDescription}</p>
                              </div>
                            </div>
                          </>
                        );
                      }
                    })
                  }
                </div>

              </div>
            )
          })}
        </div>


      </div>
      <ToastContainer toastStyle={{ backgroundColor: "#000" }} />
    </Layout>
  );
};
