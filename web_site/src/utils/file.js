import SparkMd5 from "spark-md5";
import * as API from "@/api";

const blobSlice =
  File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;

const dftOptions = {
  chunkSize: 1024 * 1024, // 分块大小
};
export default class FileUploader {
  state = {
    md5: "",
    chunkList: [],
    chunkSize: 0,
    fileSize: 0,
    taskMap: {},
  };

  get taskIds() {
    return Object.keys(this.state.taskMap).filter(
      (k) => !this.state.taskMap[k]
    );
  }

  constructor(file, opt = {}) {
    this.$file = file;
    this.state.fileSize = file.size;
    this.$options = { ...dftOptions, ...opt };
  }

  async upload() {
    const check = await this.check();
    if (!check.success) return check;
    check.data.forEach((id) => (this.state.taskMap[id] = true));
    // console.log(this.state);
    const upload = await this.doUpload();
    // console.log(upload);
    if (!upload.success) return upload;

    return API.uploadOk({
      name: this.$file.name,
      size: this.$file.size,
      type: this.$file.type,
      md5: this.state.md5,
      chunkSize: this.state.chunkSize,
    });
  }

  async doUpload() {
    const task = this.taskIds;
    const result = await Promise.all(task.map((id) => this.uploadChunk(id)));
    if (result.some((it) => !it.success))
      return {
        success: false,
        message: "上传失败,请稍后重试!",
      };
    return { success: true, message: "所有分块上传成功!" };
  }

  async uploadChunk(id) {
    const data = {
      file: new Blob([this.state.chunkList[id]]),
      total: this.state.chunkSize,
      md5: this.state.md5,
      id,
    };

    return API.uploadChunk(data);
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
    this.state.chunkSize = this.state.chunkList.length;
    this.state.md5 = md5.data;
    this.state.taskMap = [...Array(this.state.chunkSize)].reduce(
      (p, n, i) => ({ ...p, [i]: false }),
      {}
    );
    if (!md5.success) return this.error("md5 解析失败!");

    return API.check({ md5: md5.data });
  }

  // 生成文件hash
  fileMd5(file) {
    return new Promise((resolve) => {
      const {
        $options: { chunkSize },
        state: { chunkList },
      } = this;
      const chunks = Math.ceil(file.size / chunkSize);
      let currentChunk = 0;
      const spark = new SparkMd5.ArrayBuffer();
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        console.log("read chunk nr", currentChunk + 1, "of", chunks);
        spark.append(e.target.result);
        chunkList.push(e.target.result);
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
