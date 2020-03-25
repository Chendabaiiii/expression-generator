import { rangeObj } from '../renderer/index.mjs'
import Operands from '../Class/Operands.mjs'
import Operator from '../Class/Operator.mjs'

// 四则运算
const Arithmetic = {
  // 两个操作数求和 
  addOperands(a, b) {
    return (new Operands({
      range: rangeObj.range,
      numerator: a.numerator * b.denominator + b.numerator * a.denominator,
      denominator: a.denominator * b.denominator
    })).toStr();
  },
  // 两个操作数求差
  subOperands(a, b) {
    return (new Operands({
      range: rangeObj.range,
      numerator: a.numerator * b.denominator - b.numerator * a.denominator,
      denominator: a.denominator * b.denominator
    })).toStr();
  },
  // 两个操作数乘法
  multOperands(a, b) {
    return (new Operands({
      range: rangeObj.range,
      numerator: a.numerator * b.numerator,
      denominator: a.denominator * b.denominator
    })).toStr();
  },
  // 两个操作数除法
  divOperands(a, b) {
    return (new Operands({
      range: rangeObj.range,
      numerator: a.numerator * b.denominator,
      denominator: a.denominator * b.numerator
    })).toStr();
  }
}

// 将中缀表达式数组转为后缀表达式数组
export let toSuffixExp = (infix) => {
  return infix.map(expression => {
    let stack1 = [];
    let stack2 = [];
    // console.log(expression);
    expression.forEach((item, index) => {
      if (item instanceof Operands) {
        // 遇到操作数
        // 压入 stack2
        stack2.push(item)
      } else if (item === '(') {
        // 遇到左括号
        stack1.push(item);
      } else if (item === ')') {
        // 遇到右括号
        while (stack1[stack1.length - 1] !== '(') {
          stack2.push(stack1.pop());
        }
        stack1.pop();
      } else if (item instanceof Operator) {
        // 运算符
        while (stack1.length !== 0 && stack1[stack1.length - 1].value >= item.value) {
          stack2.push(stack1.pop());
        }
        stack1.push(item);
      }
    });
    while (stack1.length !== 0) {
      stack2.push(stack1.pop());
    }
    return stack2;
  })
}

// 计算中缀表达式数组计算为答案数组
export let calculateSuffix = (suffix) => {
  const {
    addOperands,
    subOperands,
    multOperands,
    divOperands
  } = Arithmetic;
  return suffix.map(expression => {
    let stack = []; // 存放运算结果
    expression.forEach(item => {
      if (item instanceof Operands) {
        stack.push(item); // 如果是操作数则推入
      } else {
        // 是操作符则弹出最顶出的两个操作数进行运算
        let b = stack.pop();
        let a = stack.pop();
        let result = null;
        switch (item.operator) {
          case '+':
            result = addOperands(a, b);
            break;
          case '-':
            result = subOperands(a, b);
            break;
          case '×':
            result = multOperands(a, b);
            break;
          case '÷':
            result = divOperands(a, b);
            break;
          default:
            break;
        }
        stack.push(result);
      }
    })
    return stack.pop();
  })
}