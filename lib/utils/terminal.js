// terminal.js |子进程执行的命令,例如在后台npm install或者npm run start
//系统模块
const { spawn } = require("child_process")

//success参数是是否显示成功消息到主进程
const cmdSpawn = (cmd,pot,path,success) => {
  //返回一个Promise
  return new Promise((resolve, reject) => {
    //...argv里的参数有三个1.cmd 2.后续参数 例如["run","start"],3.命令执行目录
    const childrenProcess = spawn(cmd,pot,path)
    //子进程的输出信息显示到主进程 成功输出and失败输出
    //通过success参数是否来显示成功的消息到主进程
    if (success) {
      childrenProcess.stdout.pipe(process.stdout)
    }
    childrenProcess.stderr.pipe(process.stderr)
    //监听结束后返回resolve()
    childrenProcess.on("close", () => {
      resolve()
    })
  })

}
module.exports = {
  cmdSpawn
}