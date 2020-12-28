# quick-react-app
### 一个基于官方create-react-app的快速开发脚手架

---

[![NPM version][npm-image]][npm-url]
[![node version][node-image]][node-url]

[npm-image]: http://img.shields.io/npm/v/quick-react-app.svg?style=flat-square
[npm-url]: http://npmjs.org/package/quick-react-app
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
## Intro
[![quick-react-scripts](https://nodei.co/npm/quick-react-app.png)](https://npmjs.org/package/quick-react-app)

## quick-react-app能帮助你做什么?

* 规范常用的目录结构
* 使用craco进行webpack配置,包括别名以及jsx文件自动识别
* 对axios的二次封装
* 使用: react-router来管理路由
* 使用styled-components+常用的css编写样式
* 使用React Hooks组件
* 自由选择是否安装并配置ant design
* 自由选择管理工具yarn or npm or cnpm
* 使用redux和中间件redux-thunk进行状态管理
* 使用immutable对项目reducer中state进行管理

## 安装使用

```shell
npm install quick-react-app -g
```
查看是否安装成功
```shell
quick-react-app --version
```


## 开始使用

创建一个名为` my-app `的项目
```shell
quick-react-app create my-app
```
添加一个名为` TopMenu `的组件
> 注意 : 添加组件和页面的命令需要在项目目录执行
```shell
cd my-app
quick-react-app addcpn TopMenu
```
添加一个名为` Profile `的页面
> 注意 : 添加组件和页面的命令需要在项目目录执行
```shell
cd my-app
quick-react-app addpage Profile
```
查看帮助
```shell
quick-react-app --help
```
