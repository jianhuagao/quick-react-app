#!/usr/bin/env node
const program = require("commander")
//自己的模块
const helpOptions = require("./lib/core/help.js")
const createCommands = require("./lib/core/create.js")

//查看版本号
program.version(require("./package.json").version)

//帮助
helpOptions()

//创建其他指令
createCommands();

//必须有这句才能生效
program.parse(process.argv)
