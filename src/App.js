import React from "react";
import PublicRoute from "./route/route";
import "./assets/css/style.css";
import "react-toastify/dist/ReactToastify.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <PublicRoute />
      </div>
    );
  }
}

export default App;
