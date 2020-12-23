const program = require("commander")
const { createProject } = require("./action")

const createCommands = () => {
  program
    .command("create <project> [others...]")
    // 这里是介绍
    .description("clone a repository")
    //执行这里
    .action(createProject)
}

module.exports = createCommands;