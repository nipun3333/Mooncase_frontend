import Layout from "../components/layout/Layout";
import HeroImg from "../assets/images/heroimage.svg";
import { Button } from "../components/styledComponents/Buttons/index";
import CopperText from "../assets/images/cooper_alchemist.svg";
import CopperFont from "../assets/images/copper_font.svg";
import { useState, useEffect } from "react";
function Home() {
  return (
    <Layout>
      <div className="container mx-auto py-4 px-8">
        <div className="grid grid-cols-2 items-center">
          <div>
            <div>
              <img src={CopperText} alt="" className="my-4" />
              <img src={CopperFont} alt="" className="" />
            </div>
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
        <div className="bg-copper">
          <div className="text-center">
            <h1 className="text-4xl font-bold">What is Copper ?</h1>
            <div className="px-16 leading-loose">
              <p className="py-6">
                Copper is the most open, transparent, and user-friendly way to
                participate in a Token Launch Auction (TLA). An TLA is a simple
                crowdfunding mechanism that enables projects and ideas from
                across the world to raise money from individuals without
                barriers to entry.
              </p>
              <p className="py-6">
                No more middlemen, capital gatekeepers, or geographical
                constraints. No KYC or any sort of privileging of larger
                investors over smaller ones. Capital can now flow freely and
                directly toward empowering the ideas that deserve it, while
                enabling investors of all sizes and backgrounds to fairly
                participate in capitalizing on these early stage opportunities.
              </p>
              <p className="py-6">
                Any idea can now be bootstrapped by an invested community and
                thus established as a transparent and equitable partnership.
                This is the future of new venture funding and Copper is here to
                make this vision a reality by unlocking the world’s “value
                reserves” to be “mined” by anyone — fairly, transparently and
                equitably.
              </p>
            </div>
            <div className="flex gap-6 py-6 justify-center">
              <Button width="200px">View Auctions</Button>
              <Button width="200px" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
