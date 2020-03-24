const xh = require('./xh');
const rj = require('./rj');
// 功能模块
module.exports = {
  // 生成 [min, max] 之间的随机数
  randomNum: (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
  // 辗转相除法求最大公约数
  gcd: (num1, num2) => {
    let remainder = 0;
    do {
      remainder = num1 % num2;
      num1 = num2;
      num2 = remainder;
    } while (remainder !== 0);
    return num1;
  },
  // 随机生成若干操作符组成的数组，传入生成个数
  generateOperatorToArr(num) {
    let operatorArr = [];
    for (let i = 0; i < num; i++) {
      operatorArr.push([' + ', ' - ', ' × ', ' ÷ '][this.randomNum(0, 3)]);
    }
    return operatorArr
  },
  // 随机生成一个操作符
  generateOperator() {
    return [' + ', ' - ', ' × ', ' ÷ '][this.randomNum(0, 3)]
  },
  // 插入括号
  insertBrackets(questionArr) {
    return questionArr.map((item, index) => {
      let bracketsNum = 0; // 括号对的数目
      // 4个操作数则最多2对括号, 3个操作数则最多1对括号
      let len = item.length;
      switch (len) {
        case 5:
          bracketsNum = this.randomNum(0, 1);
          break;
        case 7:
          bracketsNum = this.randomNum(0, 2);
          break;
        default:
          break;
      }
      // 将原来 item 项（即一个表达式）随机插入 bracketsNum 对括号
      let newItem = item;
      while (bracketsNum--) {
        newItem = this.randomInsertBrackets(newItem);
      }
      return this.rmExcessBrackets(newItem.map(item => {
        if (typeof item === 'object') {
          return item.toStr();
        }
        return item;
      }).join(''));
    });
  },
  // 随机插入括号
  randomInsertBrackets(expressionArr) {
    // 左括号可以插入的实际位置 
    let leftInsertIndex = this.findLeftCanInsert(expressionArr);
    expressionArr.splice(leftInsertIndex, 0, '('); // 插入左括号
    // 右括号可以插入的实际位置
    let rightInsertIndex = this.findRightCanInsert(expressionArr, leftInsertIndex);
    expressionArr.splice(rightInsertIndex, 0, ')'); // 插入左括号
    return expressionArr;
  },
  // 寻找左括号可以插入的位置
  findLeftCanInsert(expressionArr) {
    let Arr = [];
    // 如果是操作数，则将其位标放入数组
    expressionArr.forEach((item, index) => {
      (typeof item === 'object') && Arr.push(index);
    })
    return Arr[this.randomNum(0, Arr.length - 1)];
  },
  // 寻找右括号可以插入的位置
  findRightCanInsert(expressionArr, leftIndex) {
    let Arr = [];
    for (let i = leftIndex + 1; i < expressionArr.length; i++) {
      (typeof expressionArr[i] === 'object') && Arr.push(i + 1);
    }
    return Arr[this.randomNum(0, Arr.length - 1)];
  },
  // 去除多余的()
  rmExcessBrackets(expressionArr) {
    let exp1 = /^\([^\(^\)]*\)$/; // 首位是(,末尾是)且中间没有括号的情况
    // let exp2 = /\([^+^-^×^÷]*\)/;
    if (exp1.test(expressionArr)) {
      return expressionArr.slice(1, expressionArr.length - 1);
    }
    return expressionArr;
  },
  ...rj,
  ...xh,
}