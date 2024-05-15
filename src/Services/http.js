import axios from 'axios';

import { store } from '../Redux/Store/store';

// import { seamlessLoginUrls } from '../Utils/constants';
// import { containsSimilarUrl } from '../Utils/helperfunction/helper';

const headers = {
  "Content-type": "application/json",
  accept: "application/json",
  // 'Access-Control-Allow-Origin' : 'http://localhost:3000/',
  // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
};

axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = true;
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000/';
    // response.headers['Access-Control-Allow-Credentials'] = true
    return response;
  },
//   (error) => RejectFunction(error),
);
 

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  headers,
};
