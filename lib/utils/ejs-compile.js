//ejs-compile.js |ejs的处理,自动生成模板
//系统模块
const path = require("path")
const { promisify } = require("util")
//第三方模块
const ejs = promisify(require("ejs").renderFile)

//做法一:直接返回Promise ,const ejs = require("ejs")
// //ejsTemplate:模板,data:创建的控件名
// const compile = (ejsTemplate, data) => {
//   //直接返回一个Promise
//   return new Promise((resolve, reject) => {
//     //需要传入绝对路径
//     const tmpUrl = `../templates/${ejsTemplate}`;
//     const ioUrl = path.resolve(__dirname, tmpUrl);
//     //ejs的生成模块的方法
//     ejs.renderFile(ioUrl, { data }, (err, str) => {
//       if (err) {
//         reject(err)
//         return
//       }
//       resolve(str)
//     })
//   })
// }

//做法二:promisify和async
//ejsTemplate:模板,data:创建的控件名
const compile = async (ejsTemplate, data) => {
  //需要传入绝对路径
  const tmpUrl = `../templates/${ejsTemplate}`
  const ioUrl = path.resolve(__dirname, tmpUrl)
  const ret = await ejs(ioUrl, { data })
  return ret;
}

module.exports = {
  compile
}