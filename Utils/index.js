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
    for(let i = 0 ;i < num; i++) {
      operatorArr.push([' + ',' - ',' × ',' ÷ '][this.randomNum(0,3)]);
    } 
    return operatorArr
  },
  // 随机生成一个操作符
  generateOperator() {
    return [' + ',' - ',' × ',' ÷ '][this.randomNum(0,3)]
  },
  ...rj,
  ...xh,
}