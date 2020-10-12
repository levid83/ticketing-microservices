import axios from "axios";

const BuildClient = ({ req }) => {
  if (typeof window === "undefined") {
    //server side
    return axios.create({
      baseURL: "http://www.ld-demo-app-1.xyz",
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
