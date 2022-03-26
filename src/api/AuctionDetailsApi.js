import axios from "axios";

export const getAuctionDetailsApi = async (data) => {
  const result = await axios
    .get(process.env.REACT_APP_API_URL + "/api/get-auction-by-pool/" + data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return false;
    });
    return result;
};
