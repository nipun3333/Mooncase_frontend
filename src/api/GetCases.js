import axios from "axios";

export const getCasesApi = async (data) => {
  const result = await axios
    .get(process.env.REACT_APP_API_URL + "/api/get-case/" + data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return false;
    });
    return result;
};
