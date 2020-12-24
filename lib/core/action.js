//action.js |command后的相应处理
//系统模块
const { promisify } = require("util")
const { resolve } = require("path")
const fs = require("fs")
//第三方模块
const downloadRet = promisify(require("download-git-repo"))
const open = require("open")
const program = require("commander")
//自己写的模块
const { reactRepo } = require("../config/repo-config")
const { cmdSpawn } = require("../utils/terminal")
const { compile } = require("../utils/ejs-compile")
const { writeToFile } = require("../utils/write-to-file")


//============================创建项目
const createProject = async (project, others) => {
  console.log("please wait...:)")
  //1.clone proj,从github Clone我的模板
  await downloadRet(reactRepo, project, { clone: true })
  //2.npm install 自动安装依赖
  const cmd = process.platform === "win32" ? "yarn.cmd" : "yarn"
  await cmdSpawn(cmd, ["install"], { cwd: `./${project}` })
  //3.打开项目(yarn (run) start),这里如果使用await会阻塞浏览器的打开
  cmdSpawn(cmd, ["run", "start"], { cwd: `./${project}` })
  //4.打开浏览器,可以后续在webpack上面修改
  open("http://localhost:3000/")
}

//============================创建组件
const createComponent = async (cpn, others) => {
  //1.从ejs模板cpn.index.jsx.ejs导出index.jsx
  const indexJsx = await compile("cpn.index.jsx.ejs", { name: cpn })
  //2.写入文件
  //program.disk就是-D传的值
  const fileUrl = program.disk ? resolve(program.disk, cpn) : resolve("src/components/", cpn)
  if (!fs.existsSync(fileUrl)) {
    fs.mkdirSync(fileUrl, { recursive: true });
  }
  writeToFile(resolve(fileUrl, "index.jsx"), indexJsx)
  //3.从ejs模板cpn.style.js.ejs导出style.js
  const styleJs= await compile("cpn.style.js.ejs", {name:cpn})
  //4.写入文件，无需判断文件夹
  writeToFile(resolve(fileUrl, "style.js"), styleJs)
}

module.exports = {
  createProject,
  createComponent
}