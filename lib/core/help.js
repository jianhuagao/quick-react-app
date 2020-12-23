const program = require("commander")

const helpOptions = () => {
  program.option("-y --yes <youName>", "name yes!")
  program.option("-t --temp", "choose template")

  program.on("--help", function () {
    console.log("")
    console.log("gkd")
    console.log("gkd")
    console.log("gkd")
  })

}

module.exports = helpOptions 