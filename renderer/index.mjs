// 窗口的渲染器进程中执行
import {
  generateQuestions
} from '../Utils/questions.mjs' // 生成题目的函数

let mode; // -r 参数范围  -n 题目数目
let ansArr = []; // 答案数组
let questionTotal = 10; // 题目总数
export let rangeObj = {
  range: 10
}; // 参数范围

// 生成 questionTotal 个题目
generateQuestions(questionTotal, rangeObj.range);

const remote = require('electron').remote
// alert(remote.process.argv);  // 打印命令行参数的
// argv[0]: 文件位置
// argv[1]: 第一个参数
// argv[2]: 第二个参数
