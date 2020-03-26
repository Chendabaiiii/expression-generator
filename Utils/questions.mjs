import {
  randomNum
} from '../Utils/index.mjs';
import Operands from '../Class/Operands.mjs' // 操作数
import Operator from '../Class/Operator.mjs' // 操作符
import {
  insertBrackets
} from './brackets.mjs' // 与括号相关的方法
import {
  calculateSuffix, // 计算后缀表达式
  toSuffixExp, // 中缀转后缀
} from './calculate.mjs' // 与计算相关的方法
import {
  writeFile
} from './file.mjs'

/**
 * @description: 生成题目的函数
 * @param {number} total  题目个数
 * @param {number} range  参数范围
 * @return: ['表达式1','表达式2'...]
 */
export let generateQuestions = (total, range) => {
  let questionArr = []; // 题目数组
  let canBeZero = true; // 操作数是否可以为0 
  // 生成 total 个题目
  for (let i = 0; i < total; i++) {
    let operandNum = randomNum(2, 4); // 2-4个操作数
    let operatorNum = operandNum - 1; // 1-3个操作符
    let expArr = []; // 表达式数组
    for (let j = 0; j < operandNum; j++) {
      expArr.push(new Operands({
        range,
        canBeZero
      }));
      if (j !== operatorNum) {
        let operator = new Operator(); // 随机生成操作符
        canBeZero = (operator.operator === '÷') ? false : true; // 如果操作符是 ÷ ，那么下一个生成数不能为 0
        expArr.push(operator);
      }
    }
    questionArr.push(expArr);
  }

  let insertBracketsArr = insertBrackets(questionArr); // 插入括号
  let strQuestionsArr = questionsToStr(insertBracketsArr);
  console.log("插入括号后：", insertBracketsArr);
  console.log("变为对应的题目格式后：", strQuestionsArr);
  console.log("转为后缀表达式：", questionsToStr(toSuffixExp(insertBracketsArr)));
  console.log("答案：",calculateSuffix(toSuffixExp(insertBracketsArr)));
  // writeFile('Exercises.txt', strQuestionsArr);
}

/**
 * @description: 题目数组遍历转换为题目格式(string[]) 
 * @param {Array[]} questionArr  题目数组
 * @return: 转为固定格式的题目字符串数组
 */
export let questionsToStr = questionArr => questionArr.map((expression, index) => {
  let str = expression.map(item => (typeof item === 'object') ? item.toStr() : item);
  str.unshift(`${index + 1}：`);
  return str.join('').concat(' = ');
})