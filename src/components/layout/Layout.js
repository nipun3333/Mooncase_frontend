import React, { Component, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

class layout extends Component {
  state = {};

  render() {
    return (
      <div className="">
        <div className="p-10">
          <Header />
          <div className="pb-12 mt-8">{this.props.children}</div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default layout;
