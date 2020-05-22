import request from "./request";

export const uploadFile = async (data) => {
  if (!(data instanceof FormData)) {
    const oldData = data;
    data = new FormData();
    Object.keys(oldData).forEach((key) => {
      data.append(key, oldData[key]);
    });
  }
  return request({ url: "/api/upload", data, method: "POST", headers: {} });
};

export const check = (data) => request({ url: "/api/check", data });
