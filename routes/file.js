const path = require("path");
const fs = require("fs");
const temp = (p) => path.resolve(__dirname, "../data/temp/", p);

const sort = (list) => list.sort((a, b) => a - b);

function createDir(name) {
  return new Promise((resolve) => {
    fs.mkdir(temp(name), (err) => {
      if (err) {
        return resolve({ success: false, message: "创建失败", err });
      }
      return resolve({
        success: true,
        message: "临时文件夹创建成功!",
        data: [],
      });
    });
  });
}

function getChildren(name) {
  return new Promise((resolve) => {
    fs.readdir(temp(name), async (err, file) => {
      if (err) {
        return resolve(createDir(name));
      }
      return resolve({
        success: true,
        message: "获取上传进度成功!",
        data: sort(file),
      });
    });
  });
}

function saveChunk(file, state) {
  return new Promise((resolve) => {
    const name = temp(state["md5"] + "/" + state["id"]);
    const chunkName = "分块" + state["id"];
    fs.writeFile(name, file, (err) => {
      if (err)
        return resolve({
          success: false,
          message: chunkName + "保存失败",
          err,
        });
      resolve({ success: true, message: chunkName + "保存成功" });
    });
  });
}

function complete(state) {
  return new Promise((resolve) => {
    const dir = temp(state.md5);
    fs.access(dir, fs.constants.F_OK, async (err) => {
      if (err) {
        return resolve({ success: false, message: "文件夹不存在!" });
      }
      const result = await mergeFile(state);
      if (!result.success) return result;
      fs.rmdir(dir, (err) => {
        if (err) return resolve({ success: false, message: "合并失败!", err });
        resolve({ success: true, message: "上传成功!" });
      });
    });
  });
}

function mergeFile(state) {
  return new Promise((resolve) => {
    const dir = temp(state.md5);
    const out = fs.createWriteStream(
      path.resolve(__dirname, "../data/" + state.name)
    );
    fs.readdir(dir, async (err, file) => {
      file = sort(file);
      if (err) {
        resolve({ success: false, err, message: "合并失败!" });
        return;
      }
      const rsError = () => resolve({ success: false, message: "合并失败" });

      while (file.length) {
        const id = file.shift();
        const chunkPath = temp(state.md5 + "/" + id);
        const rs = fs.createReadStream(chunkPath);
        let success = await writeChunk(rs, out);
        if (!success) {
          rsError();
          break;
        }
        success = await delFile(chunkPath);
        if (!success) {
          rsError();
          break;
        }
      }

      out.end();

      resolve({ success: true, message: "合并成功!" });
    });
  });
}

function writeChunk(rs, ws) {
  return new Promise((resolve) => {
    rs.on("data", (chunk) => ws.write(chunk));
    rs.on("end", () => resolve(true));
    rs.on("error", () => resolve(false));
  });
}

function delFile(path) {
  return new Promise((resolve) => {
    fs.unlink(path, (e) => resolve(!e));
  });
}

module.exports = {
  getChildren,
  saveChunk,
  complete,
};
