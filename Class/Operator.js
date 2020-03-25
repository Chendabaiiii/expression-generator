const Utils = require('../Utils/index'); // 引入功能模块
// 运算符类
module.exports = class Operator {
  constructor(operator = ['+', '-', '×', '÷'][Utils.randomNum(0, 3)]) {
    this.operator = operator; // 操作符，默认是随机生成，也可以传入生成
    this.value = this.getValue();
  }

  // 计算运算符优先级
  getValue() {
    switch (this.operator) {
      case "+":
        return 1;
      case "-":
        return 1;
      case "×":
        return 2;
      case "÷":
        return 2;
      default:
        // 不存在该运算符 
        return 0;              
    }
  }

  // 转为字符串
  toStr() {
    let operator = this.operator;
    // operator = (operator === '/') ? '÷' : '/';
    // operator = (operator === '*') ? '×' : '*';
    return ` ${operator} `;
  }
}