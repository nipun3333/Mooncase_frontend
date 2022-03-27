import React, { Component, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

class layout extends Component {
  state = {};

  render() {
    <style>
      
    </style>
    return (
      <>
      <div className="h-screen" style={{backgroundImage:`url(${this.props.img1})`,backgroundSize: 'cover',opacity:0.9}}>
       {/* <div>  */}
        <div className="p-10" style={{opacity:1}}>
          <Header />
          <div className="pb-12 mt-8">{this.props.children}</div>
        </div>
        {/* <Footer /> */}
      </div>
      {
        this.props.fromAbout===true?
        <>
          <div className="flex flex-col items-center m-10">
            <div className="text-4xl font-bold text-yellow-400">Features and Benefits of Using Moon Case</div>
            <ul classname="text-white">
              <li className="m-10 font-bold">
                <span>A Moon Case Provides a basket of coins that reflects an idea</span>
              </li>
              <li className="m-10 font-bold">Simple and Easy to understand</li>
              <li className="m-10 font-bold">Create your own basket</li>
              <li className="m-10 font-bold">Start investing on various coins at lower prices</li>
            </ul>
          </div>
        </>
        :<></>
      }
      
      </>
    );
  }
}

export default layout;
