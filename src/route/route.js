import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Bucket } from "../components/bukect";
import { About } from "../pages/about";
import { BucketList } from "../pages/bucketList";

// import { PrivateRoute } from "./PrivateRoute";
import Home from "../pages/Home";

function PublicRoute() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/bucketlist" element={<BucketList />} />
          <Route path="/home" element={<Home />} />
          <Route path="/bucket" element={<Bucket />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default PublicRoute;
