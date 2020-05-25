/**
 * Created by TY-xie on 2018/4/2.
 */
import axios from "axios";
import { Message, Loading } from "element-ui";

// 请求之前的拦截器
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 请求之后的拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const dftOpt = {
  isSuccess: (res) => res.data.success,
  toast: true,
  loading: true,
};

export default function request(
  { method = "post", data, url, headers = {} },
  opt = {}
) {
  opt = { ...dftOpt, ...opt };
  return new Promise((resolve, reject) => {
    opt.loading && Loading.service("加载中...");
    let params = null;
    if (data.params) {
      params = data.params;
      delete data.params;
    }
    axios({
      method,
      url,
      data,
      params,
      headers,
    })
      .then((res) => {
        opt.loading && Loading.service().close();
        if (!opt.isSuccess(res)) {
          if (opt.toast) {
            Message.error(res.data.message || "后端操作失败!");
          }

          resolve({
            success: false,
            message: res.data.message || "后端操作失败!",
            data: res.data, // 后端操作失败返回完整res
            res: res.data,
          });
        } else {
          resolve({
            success: true,
            message: res.data.message || "操作成功!",
            data: res.data.data || res.data,
            res: res.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        opt.loading && Loading.service().close();
        Message.error("网络故障");
        resolve({
          success: false,
          message: "网络故障",
          data: err,
          res: {},
        });
      });
  });
}
