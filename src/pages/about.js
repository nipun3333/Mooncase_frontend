import React from "react";
import { useNavigate } from "react-router-dom";
export const About = () => {
  const navigate = useNavigate();
  return (
    <div className="p-10">
      <div className="flex justify-between ">
        <div className="cursor-pointer" onClick={() => navigate("/bucketlist")}>
          Bucket list
        </div>
        <div className="cursor-pointer">Connect</div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};
