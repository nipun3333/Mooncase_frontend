import Layout from "../components/layout/Layout";
import HeroImg from "../assets/images/heroimage.svg";
import { Button } from "../components/styledComponents/Buttons/index";

import { useState, useEffect } from "react";
function Home() {
  return (
    <Layout>
      <div className="container mx-auto py-4 px-8">
        <div className="grid grid-cols-2 items-center">
          <div>
            <div></div>
            <div className="">
              <p className="text-lg">
                A platform for open, transparent, and user-friendly Token
                <br></br> Launch Auctions, powered by Balancer Liquidity
                <br></br>
                Bootstrapping Pools.
              </p>
            </div>

            <div className="flex gap-6 py-6">
              <Button width="200px">View Auctions</Button>
              <Button width="200px" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          <div>
            <img src={HeroImg} alt="heroimage" className="" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
