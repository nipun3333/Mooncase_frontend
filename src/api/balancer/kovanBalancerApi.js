import axios from "axios";

export const getDataFromBalancerKovan = async (data) => {
  const result = await axios
    .post(process.env.REACT_APP_KOVAN_BALANCER_API, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return false;
    });
    return result;
};
