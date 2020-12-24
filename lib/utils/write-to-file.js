//write-to-file.js |文件写入
//系统模块
const fs = require("fs")
const writeToFile = (path,content) =>{
  return fs.promises.writeFile(path,content)
}

module.exports={
  writeToFile
}