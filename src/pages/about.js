import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import GraphComp from "./graph";
import img1 from "../assets/images/home5.png";

export const About = () => {
  const navigate = useNavigate();
  return (
    <Layout img1={img1} fromAbout={true}>
      <div className="p-10 flex items-center justify-center">  
        <div className="flex flex-col items-center justify-center w-3/2">
          <br/><br/>
          <div className="text-6xl font-bold text-yellow-400" > Moon Case </div>
          {/* <div></div> */}
          <div className="text-3xl font-bold text-yellow-400" >Start your crypto portfolio 🚀🌕🚀</div>
          {/* <div className="text-3xl font-bold text-center text-red-400" >Website works on a central wallet where one takes cryptos in a basket</div> */}
        </div>
        </div>
        {/* <img className="w-1/2" src={img1} alt='Home Page Image'/>  */}
       {/* <GraphComp /> */}
    </Layout>
  );
};


