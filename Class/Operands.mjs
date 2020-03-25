import {
  gcd,
  randomNum
} from '../Utils/index.mjs';

// 操作数类
export default class Operands {
  constructor({
    range = 10, // range 是范围
    canBeZero = true, // canBeZero 代表该数字是否可以为0，由于存在作为除数的可能性不能为0
    denominator = null, // 分母
    numerator = null // 分子
  }) {
    this.range = range; // 生成范围
    this.denominator = denominator ? denominator : randomNum(1, this.range - 1); // 分母
    this.numerator = numerator ? numerator : randomNum(canBeZero ? 0 : 1, this.denominator * this.range - 1); // 分子
  }

  // 转换为 a'b/c 格式的字符串
  toStr() {
    let integer = Math.floor(this.numerator / this.denominator); // 假分数前面的整数
    let numerator = this.numerator % this.denominator; // 分子
    let denominator = this.denominator; // 分母
    if (numerator === 0) return this.numerator / denominator; // 是否整除
    let gcdNum = gcd(numerator, denominator); // 求最大公约数
    return `${integer === 0 ? '' : `${integer}'`}${numerator / gcdNum}/${denominator / gcdNum}`;
  }
}