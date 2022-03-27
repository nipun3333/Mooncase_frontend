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
    if(result === false) {
      toast.warn(`Unable to Fetch Bucket's at the moment`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }else {
      console.log(result.data.arr);
      setBucketList(result?.data?.arr);
    }
  }

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
      <div className="grid grid-cols-3 gap-5 p-3 mx-10">
        <div
          className="p-8 rounded-lg cursor-pointer flex items-center flex-col gap-2 justify-center"
          style={{ border: "3px dashed #2A2B31" }}
          onClick={() => setAddBucketModal(true)}
        >
          <Plus />
          <h1 style={{ color: "#2A2B31" }}>Add Bucket</h1>
        </div>
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
                    <p className="text-ss text-gray-400">{bucket.creatorAddress}</p>
                    <p className="text-xs mt-2">{bucket.caseDescription}</p>
                  </div>
                </div>
              </>
            );
          })}
      </div>
      <ToastContainer toastStyle={{ backgroundColor: "#000" }} />
    </Layout>
  );
};
