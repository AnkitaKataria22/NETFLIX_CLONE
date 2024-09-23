import axios from "axios";
import AxiosCustomInstance from "./axiosInstance.js";
import { ENV_VARS } from "../config/envVars.js";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY,
  },
};

export const fetchFromTMDB = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY,
    },
  };

  // const res = await axios.get(url, options);

  const res = await AxiosCustomInstance.getInstance().get(url, options);

  if (res.status !== 200) {
    throw new Error("Failed to fetch data from tmdb" + res.statusText);
  }
  return res.data;
};
