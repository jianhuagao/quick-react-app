//help.js |--help命令的处理
const program = require("commander")

const helpOptions = () => {
  program.option("-Y --yes <youName>", "name yes!")
  program.option("-T --temp", "choose template")
  program.option("-D --disk <path>", "choose template")


  program.on("--help", function () {
    console.log("")
    console.log("gkd")
    console.log("gkd")
    console.log("gkd")
  })

}

module.exports = helpOptions 