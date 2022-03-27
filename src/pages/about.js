import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import GraphComp from "./graph";

export const About = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="p-10">
        <h1>Minimal Crypto Case</h1>
        <h4>
          This is the website which works for a central wallet where we can take
          bunch of cryptos that will be profitable
        </h4>
      </div>
      <GraphComp />
    </Layout>
  );
};
