import {
  randomNum
} from '../Utils/index.mjs';
import Operands from '../Class/Operands.mjs'
import Operator from '../Class/Operator.mjs'
import * as brackets from './brackets.mjs'
import * as calculate from './calculate.mjs'

// 生成 total 个题目的函数
export let generateQuestions = (total, range) => {
  let questionArr = []; // 题目数组
  let canBeZero = true; // 操作数是否可以为0 
  // 生成 total 个题目
  for (let i = 0; i < total; i++) {
    let operandNum = randomNum(2, 4); // 2-4个操作数
    let operatorNum = operandNum - 1; // 1-3个操作符
    let expArr = [];
    for (let j = 0; j < operandNum; j++) {
      expArr.push(new Operands({
        range,
        canBeZero
      }));
      if (j !== operatorNum) {
        let operator = new Operator(); // 随机生成操作符
        canBeZero = (operator.operator === '÷') ? false : true;
        expArr.push(operator);
      }
    }
    questionArr.push(expArr);
  }
  let insertBracketsArr = brackets.insertBrackets(questionArr);
  console.log("插入括号后：", questionsToStr(insertBracketsArr));
  console.log("转为后缀表达式：", calculate.calculateSuffix(calculate.toSuffixExp(insertBracketsArr)));
}

// 将整个 questionArr 遍历转换为题目格式
export let questionsToStr = questionArr => questionArr.map(question => (question.map(item => {
  if (typeof item === 'object') {
    return item.toStr();
  }
  return item;
})).join('').concat(' = '))