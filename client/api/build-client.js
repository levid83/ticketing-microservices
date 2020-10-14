import axios from "axios";

const BuildClient = ({ req }) => {
  if (typeof window === "undefined") {
    //server side
    return axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: req.headers,
    });
  } else {
    // client side
    return axios.create({
      baseUrl: "/",
    });
  }
};
export default BuildClient;
