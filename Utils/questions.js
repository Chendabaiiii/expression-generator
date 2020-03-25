const Utils = require('./index');
const brackets = require('./brackets');
const Operands = require('../Class/Operands'); // 操作数类
const Operator = require('../Class/Operator'); // 操作符类

// 关于问题的对象
module.exports = {
  // 生成 total 个题目的函数
  generate(total, range) {
    let questionArr = []; // 题目数组
    let canBeZero = true; // 操作数是否可以为0 
    // 生成 total 个题目
    for (let i = 0; i < total; i++) {
      let operandNum = Utils.randomNum(2, 4); // 2-4个操作数
      let operatorNum = operandNum - 1; // 1-3个操作符
      let expArr = [];
      for (let j = 0; j < operandNum; j++) {
        expArr.push(new Operands(range, canBeZero));
        if (j !== operatorNum) {
          let operator = new Operator(); // 随机生成操作符
          canBeZero = (operator.operator === '÷') ? false : true;
          expArr.push(operator);
        }
      }
      questionArr.push(expArr);
    }
    console.log("插入括号后：", brackets.insertBrackets(questionArr));
    console.log("转换为题目字符串：", this.toStr(brackets.insertBrackets(questionArr)));
  },

  // 将整个 questionArr 遍历转换为题目格式
  toStr: questionArr => questionArr.map(question => (question.map(item => {
    if (typeof item === 'object') {
      return item.toStr();
    }
    return item;
  })).join('').concat(' = ')),
}