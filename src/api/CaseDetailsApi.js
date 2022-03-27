import axios from "axios";

export const getCaseDetailsApi = async (data) => {
  const result = await axios
    .get(process.env.REACT_APP_API_URL + "/api/get-case-by-id/" + data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return false;
    });
    return result;
};
