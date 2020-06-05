import SparkMd5 from "spark-md5";
import * as API from "@/api";
import EmitAble from "./emit-able";

const blobSlice =
  File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;

const dftOptions = {
  chunkSize: 1024 * 1024, // 分块大小
};
export default class FileUploader extends EmitAble {
  state = {
    md5: "",
    chunkList: [],
    chunkLength: 0,
    fileSize: 0,
    taskMap: [],
  };

  constructor(file, opt = {}) {
    super();
    this.$file = file;
    this.state.fileSize = file.size;
    this.$options = { ...dftOptions, ...opt };
  }

  async upload() {
    const check = await this.check();
    if (!check.success) return check;
    check.data.forEach((id) => {
      const task = this.state.taskMap.find((it) => it.id === id);
      task.loaded = true;
      task.progress = 1;
    });
    this.fire("before-upload", this.state.taskMap);
    const upload = await this.doUpload();
    if (!upload.success) return upload;

    return API.uploadOk({
      name: this.$file.name,
      size: this.$file.size,
      type: this.$file.type,
      md5: this.state.md5,
      chunkLength: this.state.chunkLength,
    });
  }

  async doUpload() {
    const result = await Promise.all(
      this.state.taskMap.map((task) => this.uploadChunk(task))
    );
    if (result.some((it) => !it.success))
      return this.error("上传失败,请稍后重试!");
    return { success: true, message: "所有分块上传成功!" };
  }

  async uploadChunk(task) {
    if (task.loaded) return Promise.resolve({ success: true });

    const data = {
      file: new Blob([this.state.chunkList[task.id]]),
      total: this.state.chunkLength,
      md5: this.state.md5,
      id: task.id,
    };

    const onProgress = (e) => {
      task.progress = e.loaded / e.total;
      const totalProgress = this.state.taskMap.reduce(
        (p, t) => p + t.progress,
        0
      );
      console.log(totalProgress / this.state.chunkLength);
      this.fire("progress", this.state.taskMap);
    };

    return API.uploadChunk(data, onProgress);
  }

  error(message) {
    return {
      success: false,
      message,
    };
  }

  // 检查服务端是否存在未完成的断点,没有则创建
  async check() {
    const md5 = await this.fileMd5(this.$file);
    if (!md5.success) return this.error("md5 解析失败!");
    this.state.md5 = md5.data;
    this.state.chunkLength = this.state.chunkList.length;
    this.state.taskMap = [...Array(this.state.chunkLength)].reduce(
      (p, n, i) => [
        ...p,
        {
          id: i,
          loaded: false,
          progress: 0,
        },
      ],
      []
    );

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

const dftTaskOpt = {
  fileSize: 0,
  id: 0,
};
class Task extends EmitAble {
  constructor(opt = {}) {
    super();
    this.$options = { ...dftTaskOpt, ...opt };
  }

  upload() {}
}
