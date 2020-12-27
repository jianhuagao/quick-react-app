//action.js |command后的相应处理
//系统模块
const { resolve } = require("path")
//第三方模块
const program = require("commander")
const chalk = require('chalk');//字体颜色
const inquirer = require('inquirer')//询问交互
const ora = require('ora');//Loading...
//自己写的模块
const { cpnUrl, pageUrl } = require("../config/repo-config")
const { cmdSpawn } = require("../utils/terminal")
const { compile } = require("../utils/ejs-compile")
const { writeToFile, copyDir } = require("../utils/write-to-file")

const managementCmd = (management) => process.platform === "win32" ? `${management}.cmd` : management
const promptList = [
  {
    type: "confirm",
    message: "Do you want to use antDesign？",
    name: "watch"
  },
  {
    // 多选 
    type: "list",//type: 'list',
    message: "Choose your management tool:",
    name: "management",
    choices: [
      "npm",
      "yarn",
      "cnpm"
    ],
    // pageSize: 2 // 设置行数
  },
];
//============================创建项目
const createProject = async (project, others) => {
  //询问
  const answers = await inquirer.prompt(promptList)
  //npm or yarn
  const menCmd = managementCmd(answers.management)
  //1.clone proj,从github Clone我的模板
  const spinner = ora("Clone template...").start();
  // await downloadRet(reactRepo, project, { clone: true })
  copyDir(resolve(__dirname, "../react-template"), resolve(project),()=>{spinner.stop();return})
  console.log(chalk.green("Clone template success !!!"))
  //2.npm install 自动安装依赖
  spinner.text = 'Is helping you install dependencies...';
  await cmdSpawn(menCmd, ["install"], { cwd: `./${project}` })
  console.log(chalk.green("install dependencies success !!!"))
  //如果选择了安装antDesign
  if (answers.watch) {
    spinner.text = 'Is helping you install AntDesign...';
    //使用yarn是add 使用npm是install
    const addCmd = answers.management === "yarn" ? "add" : "install"
    await cmdSpawn(menCmd, [addCmd, "antd", "@ant-design/icons", "craco-less"], { cwd: `./${project}` })
    //配置antd环境,分别替换掉App.jsx和craco.config.js
    const appJsx = await compile("antd.App.jsx.ejs", {})
    writeToFile(resolve(`${project}/src`, "App.jsx"), appJsx)
    const configJs = await compile("antd.craco.config.js.ejs", {})
    writeToFile(resolve(`${project}`, "craco.config.js"), configJs)
    console.log(chalk.green("AntDesign installing success !!!"))
  }
  spinner.stop()
  //3.打开项目(yarn (run) start),这里如果使用await会阻塞浏览器的打开
  cmdSpawn(menCmd, ["run", "start"], { cwd: `./${project}` }, true)
  //4.打开浏览器需要引入open后open("http://localhost:3000/"),后续在webpack上面修改
}

//============================创建组件/页面
const createComponent = async (cpn, others) => {
  //判断是创建组件/页面
  const setUrl = process.argv[2] === "addcpn" ? cpnUrl : pageUrl;
  //1.获取路径program.disk就是-D传的值
  const fileUrl = program.disk ? resolve(program.disk, cpn.toLowerCase()) : resolve(setUrl, cpn.toLowerCase())
  //2.从ejs模板cpn.index.jsx.ejs导出index.jsx
  //组件名首字母大写
  const cpnName = cpn.replace(cpn.charAt(0), cpn.charAt(0).toUpperCase());
  const indexJsx = await compile("cpn.index.jsx.ejs", { name: cpnName })
  //3.写入文件
  writeToFile(resolve(fileUrl, "index.jsx"), indexJsx)
  //4.从ejs模板cpn.style.js.ejs导出style.js
  const styleJs = await compile("cpn.style.js.ejs", { name: cpnName })
  //5.写入文件
  writeToFile(resolve(fileUrl, "style.js"), styleJs)
  console.log(chalk.green(`Success Url:${fileUrl}`))
}


module.exports = {
  createProject,
  createComponent
}