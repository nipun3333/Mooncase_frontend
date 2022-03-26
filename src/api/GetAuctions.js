import axios from "axios";

export const getAuctionsApi = async (data) => {
  const result = await axios
    .get(process.env.REACT_APP_API_URL + "/api/get-auction/" + data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return false;
    });
    return result;
};
