import axios from "axios";
import { appConfig } from "../constants/config-app";
import ToastServive from "react-material-toast";
const toast = ToastServive.new({
  place: "topRight",
  duration: 1,
  maxCount: 8,
});

export default function callApi(endpoint, method = "GET", body, isAuth) {
  if (isAuth) {
    return axios({
      method: method,
      url: `${appConfig.ApiUrl}/${endpoint}`,
      data: body,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).catch((error) => {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error(error.request);
      } else {
        toast.error(error.message);
      }
    });
  } else {
    return axios({
      method: method,
      url: `${appConfig.ApiUrl}/${endpoint}`,
      data: body,
    }).catch((error) => {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error(error.request);
      } else {
        toast.error(error.message);
      }
    });
  }
}


export  function callApiLogin(endpoint, method = "GET", body, tokenAdmin) {
  return axios({
    method: method,
    url: `${appConfig.ApiUrl}/${endpoint}`,
    data: body,
    headers: { Authorization: `Bearer ${tokenAdmin}` },
  }).catch((error) => {
    if (error.response) {
      toast.error(error.response.data.message);
    } else if (error.request) {
      toast.error(error.request);
    } else {
      toast.error(error.message);
    }
  });
}
