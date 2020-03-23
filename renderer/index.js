// 窗口的渲染器进程中执行
const Utils = require('./Utils/index'); // 引入功能模块
const Operands = require('./Class/Operands'); // 操作数类

let mode; // -r 参数范围  -n 题目数目
let questionTotal = 10; // 题目总数
let range = 10; // 参数范围
let questionArr = []; // 题目数组
let ansArr = []; // 答案数组

for (let i = 0; i < questionTotal; i++) {
  let operandNum = Utils.randomNum(2, 4); // 2-4个操作数
  let operatorNum = operandNum - 1; // 1-3个操作符
  let expArr = [];
  for (let j = 0; j < operandNum; j++) {
    expArr.push(new Operands(range));
    if(j !== operatorNum) {
      expArr.push(Utils.generateOperator());
    }
  }
  questionArr.push(expArr);
}
console.log(questionArr);


const remote = require('electron').remote
// alert(remote.process.argv);  // 打印命令行参数的
// argv[0]: 文件位置
// argv[1]: 第一个参数
// argv[2]: 第二个参数