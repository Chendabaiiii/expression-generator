const Utils = require('../Utils/index'); // 引入功能模块
// 操作数类
module.exports = class Operands {
  constructor(range = 10) {
    this.range = range; // 生成范围
    this.denominator = Utils.randomNum(1, this.range - 1); // 分母
    this.numerator = Utils.randomNum(0, this.denominator * this.range -1); // 分子
  }

  // 转换为 a'b/c 格式的字符串
  toStr() {
    let integer = Math.floor(this.numerator / this.denominator);   // 假分数前面的整数
    let numerator = this.numerator % this.denominator;             // 分子
    let denominator = this.denominator;     // 分母
    if(numerator === 0) return this.numerator / denominator;    // 是否整除
    let gcd = Utils.gcd(numerator, denominator);    // 求最大公约数
    return `${integer === 0 ? '' : integer}'${numerator / gcd}/${denominator / gcd}`;
  }
}
