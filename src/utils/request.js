import Vue from "vue";
import axios from "axios";
import {
  baseURL,
  contentType,
  tokenName,
  successCode,
  requestTimeout,
} from "@/config/settings";
import store from "@/store";
import router from "@/router";
import qs from "qs";

let loadingInstance;

const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    "Content-Type": contentType,
  },
  //withCredentials: true,
});

instance.jsonp = (url, data) => {
  if (!url) throw new Error("url is necessary");
  const callback = "CALLBACK" + Math.random().toString().substr(9, 18);
  const JSONP = document.createElement("script");
  JSONP.setAttribute("type", "text/javascript");

  const headEle = document.getElementsByTagName("head")[0];

  let ret = "";
  if (data) {
    if (typeof data === "string") ret = "&" + data;
    else if (typeof data === "object") {
      for (let key in data)
        ret += "&" + key + "=" + encodeURIComponent(data[key]);
    }
    ret += "&_time=" + Date.now();
  }
  JSONP.src = `${url}?callback=${callback}${ret}`;
  return new Promise((resolve, reject) => {
    window[callback] = (r) => {
      resolve(r);
      headEle.removeChild(JSONP);
      delete window[callback];
    };
    headEle.appendChild(JSONP);
  });
};

instance.interceptors.request.use(
  (config) => {
    if (store.getters["passport/token"]) {
      config.headers[tokenName] = store.getters["passport/token"];
    }
    if (
      contentType === "application/x-www-form-urlencoded;charset=UTF-8" &&
      config.data
    ) {
      config.data = qs.stringify(config.data);
    }
    loadingInstance = Vue.prototype.$baseLoading();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (loadingInstance) loadingInstance.close();
    const { data, config } = response;
    const { code, msg, error } = data;
    // 操作正常Code数组
    const codeVerificationArray = Array.isArray(successCode)
      ? [...successCode]
      : [...[successCode]];
    // 是否操作正常
    if (codeVerificationArray.includes(code)) {
      return data;
    } else {
      Vue.prototype.$baseMessage(msg || `后端接口${code}异常`, "error");
      return Promise.reject(
        new Error(
          "请求异常拦截:" +
            JSON.stringify({ url: config.url, code, msg, error }) || "Error"
        )
      );
    }
  },
  (error) => {
    if (loadingInstance) loadingInstance.close();
    const { message, response } = error;
    if (response && response.data) {
      const { code, msg, error } = response.data;
      Vue.prototype.$baseMessage(
        msg || message || `后端${code}接口异常`,
        "error"
      );
      if (response.status === 401) {
        store.commit("passport/clearToken");
        router.push({ path: "/login" }).catch(() => {});
      } else if (response.status === 403) {
        router.push({ path: "/403" }).catch(() => {});
      }

      return Promise.reject(
        new Error(
          "请求异常拦截:" +
            JSON.stringify({ url: response.config.url, code, msg, error }) ||
            "Error"
        )
      );
    } else {
      let { message } = error;
      if (message === "Network Error") {
        message = "后端接口连接异常";
      }
      if (message.includes("timeout")) {
        message = "后端接口请求超时";
      }
      if (message.includes("Request failed with status code")) {
        const code = message.substr(message.length - 3);
        message = "后端接口" + code + "异常";
      }
      Vue.prototype.$baseMessage(message || `后端接口未知异常`, "error");
      return Promise.reject(error);
    }
  }
);

export default instance;
