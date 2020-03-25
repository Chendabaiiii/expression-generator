import {
  randomNum
} from '../Utils/index.mjs';
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
  expressionArr.splice(rightInsertIndex, 0, ')'); // 插入左括号
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
  let Arr = [];
  for (let i = leftIndex + 1; i < expressionArr.length; i++) {
    (expressionArr[i] instanceof Operands) && Arr.push(i + 1);
  }
  return Arr[randomNum(0, Arr.length - 1)];
}

// 去除多余的()
export let rmExcessBrackets = (expressionArr) => {
  let exp1 = /^\([^\(^\)]*\)$/; // 首位是(,末尾是)且中间没有括号的情况
  // let exp2 = /\([^+^-^×^÷]*\)/;
  if (exp1.test(expressionArr)) {
    return expressionArr.slice(1, expressionArr.length - 1);
  }
  return expressionArr;
}
