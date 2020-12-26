//action.js |command后的相应处理
//系统模块
const { promisify } = require("util")
const { resolve } = require("path")
// const fs = require("fs")
//第三方模块
const downloadRet = promisify(require("download-git-repo"))
const program = require("commander")
//自己写的模块
const { reactRepo,cpnUrl,pageUrl } = require("../config/repo-config")
const { cmdSpawn } = require("../utils/terminal")
const { compile } = require("../utils/ejs-compile")
const { writeToFile } = require("../utils/write-to-file")

//============================创建项目
const createProject = async (project, others) => {
  console.log("Please wait :)")
  //1.clone proj,从github Clone我的模板
  console.log("Clone template from github...")
  await downloadRet(reactRepo, project, { clone: true })
  //2.npm install 自动安装依赖
  console.log("Is helping you install dependencies...")
  const cmd = process.platform === "win32" ? "yarn.cmd" : "yarn"
  await cmdSpawn(cmd, ["install"], { cwd: `./${project}` })
  //3.打开项目(yarn (run) start),这里如果使用await会阻塞浏览器的打开
  cmdSpawn(cmd, ["run", "start"], { cwd: `./${project}` })
  //4.打开浏览器需要引入open后open("http://localhost:3000/"),后续在webpack上面修改
}

//============================创建组件/页面
const createComponent = async (cpn, others) => {
  //判断是创建组件/页面
  const setUrl=process.argv[2]==="addcpn"?cpnUrl:pageUrl;
  //1.获取路径program.disk就是-D传的值
  const fileUrl = program.disk ? resolve(program.disk, cpn.toLowerCase()) : resolve(setUrl, cpn.toLowerCase())
  //2.从ejs模板cpn.index.jsx.ejs导出index.jsx
  //组件名首字母大写
  const cpnName= cpn.replace(cpn.charAt(0),cpn.charAt(0).toUpperCase());
  const indexJsx = await compile("cpn.index.jsx.ejs", { name: cpnName})
  //3.写入文件
  writeToFile(resolve(fileUrl, "index.jsx"), indexJsx)
  //4.从ejs模板cpn.style.js.ejs导出style.js
  const styleJs= await compile("cpn.style.js.ejs", {name: cpnName})
  //5.写入文件
  writeToFile(resolve(fileUrl, "style.js"), styleJs)
  console.log(`Success Url:${fileUrl}`)
}


module.exports = {
  createProject,
  createComponent
}