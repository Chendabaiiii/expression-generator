// 窗口的渲染器进程中执行
const questions = require('./Utils/questions');
const Utils = require('./Utils/index'); // 引入功能模块

let mode; // -r 参数范围  -n 题目数目
let questionTotal = 10; // 题目总数
let range = 10; // 参数范围
let ansArr = []; // 答案数组

// 生成 questionTotal 个题目
questions.generate(questionTotal, range);


const remote = require('electron').remote
// alert(remote.process.argv);  // 打印命令行参数的
// argv[0]: 文件位置
// argv[1]: 第一个参数
// argv[2]: 第二个参数