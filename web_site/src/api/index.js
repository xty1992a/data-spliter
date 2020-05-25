import request from "./request";

function data2form(data) {
  if (!(data instanceof FormData)) {
    const oldData = data;
    data = new FormData();
    Object.keys(oldData).forEach((key) => {
      data.append(key, oldData[key]);
    });
  }
  return data;
}

export const uploadFile = (data) =>
  request({
    url: "/api/upload",
    data: data2form(data),
    method: "POST",
    headers: {},
  });

export const check = (data) => request({ url: "/api/check", data });

// 上传分块
export const uploadChunk = (data) =>
  request({
    url: "/api/uploadChunk",
    data: data2form(data),
    method: "POST",
    headers: {},
  });

export const uploadOk = (data) => request({ url: "/api/complete", data });
