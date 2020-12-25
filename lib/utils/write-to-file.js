//write-to-file.js |文件写入
//系统模块
const fs = require("fs")
const path =require("path")

const writeToFile = (pathUrl,content) =>{
  //因为这个路径包括了文件,所以需要取路径
  const dirnamePath=path.dirname(pathUrl)
  if (!fs.existsSync(dirnamePath)) {
    fs.mkdirSync(dirnamePath, { recursive: true });
  }
  return fs.promises.writeFile(pathUrl,content)
}

module.exports={
  writeToFile
}