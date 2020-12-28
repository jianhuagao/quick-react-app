//help.js |--help命令的处理
const program = require("commander")
const chalk = require('chalk');

const helpOptions = () => {
  program.option("-D --disk <path>", "Target path")


  program.on("--help", function () {
    console.log("")
    console.log(chalk.blue("======================================================="))
    console.log(chalk.blue("git clone https://github.com/jianhuagao/quick-react-app.git"))
  })

}

module.exports = helpOptions 