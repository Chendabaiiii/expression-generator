const Utils = require('./index');
const Operands = require('../Class/Operands'); // 操作数类
const Operator = require('../Class/Operator'); // 操作符类

module.exports = {
  // 将中缀表达式数组转为后缀表达式数组
  toSuffixExp(infix) {
    let stack1 = [];
    let stack2 = [];
    infix.forEach((item, index) => {
      // 遇到操作数
      if (item instanceof Operands) {
        // 压入 stack2
        stack2.push(item)
      } else {
        switch (item) {
          // 遇到左括号
          case '(':
            break;
            // 遇到右括号
          case ')':
            break;
            // 运算符
          default:
            // 如果S1栈为空或栈顶为左括号则入栈
            if (stack1.length === 0 || stack1[stack2.length - 1] === '(') {
              stack1.push(item);
            }
            break;
        }
      }
    })
  },
}