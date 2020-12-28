//create.js |command以及格式
//第三方模块
const program = require("commander")
//自己的模块
const { createProject,createComponent } = require("./action")

//创建command
const createCommands = () => {
  program
    .command("create <project> [others...]")
    // 这里是介绍
    .description("create a project 例如 quick-react-app create my-app")
    //执行这里
    .action(createProject)

  program
    .command("addcpn <name> [others...]")
    // 这里是介绍
    .description("add a Component 例如 quick-react-app addcpn Topmenu [-D src/cpn]")
    //执行这里
    .action(createComponent)
    
  program
    .command("addpage <name> [others...]")
    // 这里是介绍
    .description("add a page 例如 quick-react-app addpage Home [-D src/my-page]")
    //执行这里
    .action(createComponent)
}

module.exports = createCommands;
