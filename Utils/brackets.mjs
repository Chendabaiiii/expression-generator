import {
  randomNum
} from './index.mjs';
import {
  toSuffixExp,
  calculateSuffix
} from './calculate.mjs'
import Operands from '../Class/Operands.mjs'

/**
 * @description: 给问题数组的每个表达式插入括号的主要函数
 * @param {Array[]} questionArr 表达式未插入括号的问题数组
 * @return: 表达式插入括号后的问题数组
 */
export let insertBrackets = (questionArr) => {
  return questionArr.map((item, index) => {
    let bracketsNum = 0; // 括号对的数目
    switch (item.length) {
      case 5:
        bracketsNum = randomNum(0, 1); // 3个操作数则最多1对括号
        break;
      case 7:
        bracketsNum = randomNum(0, 2); // 4个操作数则最多2对括号
        break;
      default:
        break;
    }
    // 将原来 item 项（即一个表达式）随机插入 bracketsNum 对括号
    let newItem = item;
    while (bracketsNum--) {
      newItem = randomInsertBrackets(newItem);
    }
    return rmExcessBrackets(newItem);
  });
}

/**
 * @description: 随机插入括号
 * @param {(string|Object)[]} expressionArr 表达式（是一个由'操作数'和'操作符'组成的表达式）
 * @return: 插入括号后的表达式数组
 */
export let randomInsertBrackets = (expressionArr) => {
  // 左括号可以插入的实际位置 
  let leftInsertIndex = findLeftCanInsert(expressionArr);
  expressionArr.splice(leftInsertIndex, 0, '('); // 插入左括号
  // 右括号可以插入的实际位置
  let rightInsertIndex = findRightCanInsert(expressionArr, leftInsertIndex);
  if(rightInsertIndex === false) {
    expressionArr.splice(leftInsertIndex, 1);   // 删除左括号
  } else {
    expressionArr.splice(rightInsertIndex, 0, ')'); // 插入左括号
  }
  return expressionArr;
}

/**
 * @description: 寻找左括号可以插入的位置
 * @param {(string|Object)[]} expressionArr 表达式数组
 * @return: 随机返回一个左括号可插入位置
 */
export let findLeftCanInsert = (expressionArr) => {
  let Arr = [];
  // 如果是操作数，则将其位标放入数组
  expressionArr.forEach((item, index) => {
    (item instanceof Operands) && Arr.push(index);
  })
  return Arr[randomNum(0, Arr.length - 1)];
}

/**
 * @description: 寻找右括号可以插入的位置
 * @param {(string|Object)[]} expressionArr 已经插入了左括号的表达式数组
 * @param {number} leftIndex 左括号预插入位置
 * @return: 随机返回一个右括号可插入位置，如果没有则返回 false
 */
export let findRightCanInsert = (expressionArr, leftIndex) => {
  let Arr = [];   // 右括号可以插入的位置数组
  for (let i = leftIndex + 1; i < expressionArr.length; i++) {
    // 操作数的右边而且操作数左边没有(
    if((expressionArr[i] instanceof Operands) && (expressionArr[i - 1] !== '(')) {
      Arr.push(i + 1);
    }
  }
  // 没有符合的位置，那么就返回false
  if (Arr.length === 0) {
    return false;
  }
  return Arr[randomNum(0, Arr.length - 1)];
}

/**
 * @description: 去除多余的括号 TODO:
 * @param {(string|Object)[]} expressionArr 已经插入了括号后的表达式数组 
 * @return: 返回去除多余括号后的表达式数组
 */
export let rmExcessBrackets = (expressionArr) => {
  let exp2 = /^\(((?!.*(\)[^\(^\)]*\()).)*\)$/;   // 第一位是(,最后一位是)，然后中间不是 )...( 的情况，就要去除首尾
  // console.log("去除括号",expressionArr);
  // console.log("去除括号",expressionArr.join(''));
  if (exp2.test(expressionArr.join(''))) {
    return expressionArr.slice(1, expressionArr.length - 1);
  }
  return expressionArr;
}