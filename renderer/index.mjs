// 窗口的渲染器进程中执行
import {
  generateQuestions,
} from '../Utils/questions.mjs' // 生成题目的函数
import {
  parameterCheck
} from '../Utils/index.mjs'

let mode = []; // -r 参数范围  -n 题目数目
let ansArr = []; // 答案数组
let questionTotal = 10; // 题目总数
// 参数范围
export let rangeObj = {
  range: 10
};

// 生成 questionTotal 个题目
generateQuestions(questionTotal, rangeObj.range);

const remote = require('electron').remote;
let argv = remote.process.argv; // 命令行参数的
console.log(argv);
switch (argv.length) {
  // 没有传参
  case 1:
    console.log('输入参数错误，请选择模式');
    console.log('-r 参数控制题目中数值（自然数、真分数和真分数分母）的范围');
    console.log('-n 参数控制生成题目的个数');
    console.log('示例：.exe -n 10 -r 10');
    console.log('示例：.exe -e <exercisefile>.txt -a <answerfile>.txt');
    console.log('示例：.exe -n 10');
    console.log('示例：.exe -r 10');
    break;
    // 只传入一个模式
  case 3: {
    let firstMode = argv[1]; // 第一个模式
    let firstParam = argv[2]; // 第一个参数 
    if (!parameterCheck(firstMode, firstParam)) break;
    mode.push(firstMode);
    switch (firstMode) {
      case '-n':
        // 代表数目个数，没有传入参数范围，默认为10
        generateQuestions(firstParam, rangeObj.range);
        break;
      case '-r':
        // 代表参数范围，没有传入题目个数，也默认为10
        generateQuestions(questionTotal, firstParam);
        break;
      default:
        console.log('参数有误，请重新输入');
        break;
    }
    break;
  }
  // 传入两个模式
  // -n -r 或者 -e -a
  case 5: {
    let firstMode = argv[1]; // 第一个模式
    let firstParam = argv[2]; // 第一个参数 
    let secondMode = argv[3]; // 第一个模式
    let secondParam = argv[4]; // 第一个参数 
    if (!parameterCheck(firstMode, firstParam) || !parameterCheck(secondMode, secondParam)) break;
    switch (firstMode) {
      case '-n':
        if (secondMode !== '-r') {
          console.log('参数有误，请重新输入');
          break;
        }
        generateQuestions(firstParam, secondParam); // -n -r的情况
        break;
      case '-r':
        if (secondMode !== '-n') {
          console.log('参数有误，请重新输入');
          break;
        }
        generateQuestions(secondParam, firstParam); // -r -n的情况
        break;
      case '-e':
        if (secondMode !== '-a') {
          console.log('参数有误，请重新输入');
          break;
        }
        // generateQuestions(firstParam, secondParam); // -e -a的情况
        break;
      case '-a':
        if (secondMode !== '-e') {
          console.log('参数有误，请重新输入');
          break;
        }
        // generateQuestions(secondParam, firstParam); // -a -e的情况
        break;
    }
  }
  default:
    console.log('参数有误，请重新输入');
    break;
}
// alert(remote.process.argv); 
// argv[0]: 文件位置
// argv[1]: 第一个参数
// argv[2]: 第二个参数