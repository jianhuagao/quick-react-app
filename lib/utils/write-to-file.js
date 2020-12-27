//write-to-file.js |文件写入
//系统模块
const fs = require("fs");
const path = require("path")

const writeToFile = (pathUrl, content) => {
  //因为这个路径包括了文件,所以需要取路径
  const dirnamePath = path.dirname(pathUrl)
  if (!fs.existsSync(dirnamePath)) {
    fs.mkdirSync(dirnamePath, { recursive: true });
  }
  return fs.promises.writeFile(pathUrl, content)
}

//复制整个文件夹
const copyDir = (sourcePath, targetPath, err) => {
  const flag1 = fs.existsSync(sourcePath)
  const flag2 = fs.existsSync(targetPath)
  // 1.容错处理 
  if (!flag1) {
    err();
    throw new Error("Source directory does not exist!!!" + sourcePath);
  }
  if (flag2) {
    err();
    throw new Error("Target directory exists!!!" + targetPath);
  }
  // 2.创建目标文件夹
  fs.mkdirSync(targetPath);
  // 3.读取源目录的子目录
  fs.readdirSync(sourcePath).forEach(item => {
    // 拼接
    let midSourcePath = sourcePath + "/" + item;
    let midTargetPath = targetPath + "/" + item;
    // 读取信息
    if (fs.statSync(midSourcePath).isFile()) {
      // 是文件
      fs.copyFileSync(midSourcePath, midTargetPath)
    } else {
      // 是文件夹 (递归)
      copyDir(midSourcePath, midTargetPath)
    }
  })
}

module.exports = {
  writeToFile,
  copyDir
}