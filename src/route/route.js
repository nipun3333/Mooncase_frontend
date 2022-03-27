import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Bucket } from "../components/bucket";
import { About } from "../pages/about";
import { BucketList } from "../pages/bucketList";

// import { PrivateRoute } from "./PrivateRoute";

function PublicRoute() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/bucketlist" element={<BucketList />} />

          <Route path="/bucket/:id" element={<Bucket />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default PublicRoute;
