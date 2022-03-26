import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { PrivateRoute } from "./PrivateRoute";
import Home from "../pages/Home";

function PublicRoute() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default PublicRoute;
