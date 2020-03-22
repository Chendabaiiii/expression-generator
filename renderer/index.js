// 窗口的渲染器进程中执行
const Utils = require('./Utils/index');   // 引入功能模块
Utils.xhnb();

// ES6类
class App {
  constructor() {
  }
  init() {
  }
}

const remote = require('electron').remote
// alert(remote.process.argv);  // 打印命令行参数的
// argv[0]: 文件位置
// argv[1]: 第一个参数
// argv[2]: 第二个参数