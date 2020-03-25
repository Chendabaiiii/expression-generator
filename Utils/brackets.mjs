import {
  randomNum
} from './index.mjs';
import {
  toSuffixExp,
  calculateSuffix
} from './calculate.mjs'
import Operands from '../Class/Operands.mjs'

// 插入括号主要函数
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

// 随机插入括号
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

// 寻找左括号可以插入的位置
export let findLeftCanInsert = (expressionArr) => {
  let Arr = [];
  // 如果是操作数，则将其位标放入数组
  expressionArr.forEach((item, index) => {
    (item instanceof Operands) && Arr.push(index);
  })
  return Arr[randomNum(0, Arr.length - 1)];
}

// 寻找右括号可以插入的位置
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

// 去除多余的() TODO:
export let rmExcessBrackets = (expressionArr) => {
  let exp2 = /^\(((?!.*(\)[^\(^\)]*\()).)*\)$/;   // 第一位是(,最后一位是)，然后中间不是 )...( 的情况，就要去除首尾
  // console.log("去除括号",expressionArr);
  // console.log("去除括号",expressionArr.join(''));
  if (exp2.test(expressionArr.join(''))) {
    return expressionArr.slice(1, expressionArr.length - 1);
  }
  return expressionArr;
}