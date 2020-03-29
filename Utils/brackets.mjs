import {
  randomNum
} from './index.mjs';
import {
  calculateExp
} from './calculate.mjs'
import Operands from '../Class/Operands.mjs'
import Operator from '../Class/Operator.mjs'

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
    console.log("index", index);

    while (bracketsNum--) {
      // console.log(newItem);
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
let randomInsertBrackets = (expressionArr) => {
  // 寻找左括号可插入位置
  let leftInsertIndex = findLeftCanInsert(expressionArr);
  // 插入括号并返回新数组
  return findRightCanInsert(expressionArr, leftInsertIndex);
}

/**
 * @description: 寻找左括号可以插入的位置
 * @param {(string|Object)[]} expressionArr 表达式数组
 * @return: 随机返回一个左括号可插入位置
 */
let findLeftCanInsert = (expressionArr) => {
  let Arr = [];
  // 如果是操作数，则将其位标放入数组
  expressionArr.forEach((item, index) => {
    (item instanceof Operands) && Arr.push(index);
  })
  let leftInsertIndex = Arr[randomNum(0, Arr.length - 1)];
  return leftInsertIndex;
}

/**
 * @description: 寻找右括号可以插入的位置TODO:
 * @param {(string|Object)[]} expressionArr 已经插入了左括号的表达式数组
 * @param {number} leftIndex 左括号预插入位置
 * @return: 随机返回一个右括号可插入位置，如果没有则返回 false 
 */
let findRightCanInsert = (expressionArr, leftInsertIndex) => {
  let Arr = []; // 右括号可以插入的位置数组
  let beforeInsert = expressionArr; // 未插入括号之前的表达式
  // console.log('插入前',beforeInsert);
  let beforeValue = calculateExp(beforeInsert); // 计算未插入之前的值
  // 插入左括号
  expressionArr.splice(leftInsertIndex, 0, '(');
  // let operatorCnt = []; // 计算操作符个数
  // let frontOperator = null; 
  // 获取左括号前面的操作符
  // (!leftInsertIndex) && (frontOperator = expressionArr[leftInsertIndex - 1]);
  // leftInsertIndex && expressionArr.forEach(item => {
  //   if (item instanceof Operator) {
  //     operatorCnt[item.operator]++; // + - × ÷
  //   }
  // })
  // 1 2 3 
  //    ↓ 
  // 1 (2 3
  for (let i = leftInsertIndex + 1; i < expressionArr.length; i++) {
    // 操作数的右边而且操作数左边没有(
    if ((expressionArr[i] instanceof Operands) && (expressionArr[i - 1] !== '(')) {
      console.log("nnnnnn", expressionArr[i - 1], expressionArr[i], expressionArr);
      Arr.push(i + 1);
    }
  }
  // 没有符合的位置，那么就返回false
  if (Arr.length === 0) {
    // 如果找不到右括号可以插入的位置，则删除左括号
    expressionArr.splice(leftInsertIndex, 1);
    return expressionArr;
  }
  // 右括号可插入位置
  let rightInsertIndex = Arr[randomNum(0, Arr.length - 1)];
  expressionArr.splice(rightInsertIndex, 0, ')'); // 插入右括号
  
  let innerExp = [];    // 括号内容，特殊判断如果前面是÷，且括号内容是0那么括号不符合条件
  let beforeOperator = expressionArr[leftInsertIndex - 1];
  for (let i = leftInsertIndex + 1; i < rightInsertIndex; i++) {
    innerExp.push(expressionArr[i]);
  }
  console.log('aaaaaa',expressionArr, innerExp);
  
  if(beforeOperator && beforeOperator.operator === '÷' && calculateExp(innerExp).value === 0) {
    expressionArr.splice(rightInsertIndex, 1); // 删除右括号
    expressionArr.splice(leftInsertIndex, 1); // 删除左括号
  } 
  let afterValue = calculateExp(expressionArr); // 插入后的值
  if (beforeValue.value === afterValue.value) { // 如果插入括号后的值与插入前相等，那么括号无意义
    expressionArr.splice(rightInsertIndex, 1); // 删除右括号
    expressionArr.splice(leftInsertIndex, 1); // 删除左括号
  }
  return expressionArr;
}

/**
 * @description: 去除多余的括号 TODO:
 * @param {(string|Object)[]} expressionArr 已经插入了括号后的表达式数组 
 * @return: 返回去除多余括号后的表达式数组
 */
let rmExcessBrackets = (expressionArr) => {
  let exp1 = /^\(((?!.*(\)[^\(^\)]*\()).)*\)$/; // 第一位是(,最后一位是)，然后中间不是 )...( 的情况，就要去除首尾
  if (exp1.test(expressionArr.join(''))) {
    return expressionArr.slice(1, expressionArr.length - 1);
  }
  return expressionArr;
}