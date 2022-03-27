import axios from "axios";

export const createCaseApi = async (data) => {
  const result = await axios
    .post(process.env.REACT_APP_API_URL + "/api/case-created", data)
    .then((res) => {
      console.log("success api called", res)
      return res.data;
    })
    .catch((error) => {
      return false;
    });
    return result;
};
