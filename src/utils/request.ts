import axios from "axios";

let isDev = process.env.NODE_ENV === "development";
let baseUrl = isDev ? "/api" : "/";
export const http = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

http.interceptors.request.use(
  (req) => {
    // req.headers.authorization = 'Bearer '+sessionStorage.getItem("ACCESS_TOKEN");
    return req;
  },
  (err) => {
    throw err;
  }
);

http.interceptors.response.use(
  (res) => {
    const { code } = res.data;
    if (code === 401) {
      // window.location.replace("/");
    }
    if (code != "200") {
      // Message.error(res.data.message)
    }
    return res.data;
  },
  (err) => {
    const { response } = err;
    const { code } = response.data;
    if (code === 401) {
      // window.location.replace("/");
    }
    throw err;
  }
);
