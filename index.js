#!/usr/bin / env node
const program = require("commander")
const helpOptions = require("./lib/core/help.js")
const createCommands = require("./lib/core/create.js")

//查看版本号
program.version(require("./package.json").version)

//帮助
helpOptions()

//创建其他指令
createCommands();

program.parse(process.argv)
