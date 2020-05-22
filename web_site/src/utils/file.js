import SparkMd5 from "spark-md5";
import * as API from "@/api";

const dftOptions = {
  chunkSize: 1024 * 1024, // 分块大小
};
const blobSlice =
  File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;

export default class FileUploader {
  constructor(file, opt = {}) {
    this.$file = file;
    this.$options = { ...dftOptions, ...opt };
    this.chunkBox = [];
  }

  async upload() {
    const result = await this.check();
    console.log(result);
  }

  error(message) {
    console.log(message);
    return {
      success: false,
      message,
    };
  }

  // 检查服务端是否存在未完成的断点,没有则创建
  async check() {
    const md5 = await this.fileMd5(this.$file);
    if (!md5.success) return this.error("md5 解析失败!");
    const res = await API.check({ md5: md5.data });
    if (!res.success) return this.error("服务端检查失败!");
    return {
      success: true,
      data: md5.data,
    };
  }

  // 生成文件hash
  fileMd5(file) {
    return new Promise((resolve) => {
      const { chunkSize, chunkBox } = this;
      const chunks = Math.ceil(file.size / chunkSize);
      let currentChunk = 0;
      const spark = new SparkMd5.ArrayBuffer();
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        console.log("read chunk nr", currentChunk + 1, "of", chunks);
        spark.append(e.target.result);
        chunkBox.push(e.target.result);
        currentChunk++;

        if (currentChunk >= chunks)
          return resolve({ success: true, data: spark.end() });
        loadNext();
      };

      fileReader.onerror = () => {
        resolve({ success: false, message: "oops, something went wrong." });
      };

      function loadNext() {
        var start = currentChunk * chunkSize,
          end = start + chunkSize >= file.size ? file.size : start + chunkSize;

        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
      }

      loadNext();
    });
  }
}
