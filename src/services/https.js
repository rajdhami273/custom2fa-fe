import axios from "axios";
import { serverUrl } from "./config";

const https = axios.create({
  baseURL: `${serverUrl}/api/v1`,
  headers: { "Content-Type": "application/json" },
});

https.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "authToken"
    )}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// Add a response interceptor
https.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log('interceptor success');
    // console.log(response)
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(
      "interceptor error",
      JSON.stringify(error.message),
      error.response
    );
    if (
      error.message.match(/403/) ||
      (error.response && error.response.data.message.match(/jwt expired/))
    ) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default https;
