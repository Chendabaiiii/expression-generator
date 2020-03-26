import {
  gcd,
  randomNum
} from '../Utils/index.mjs';
import { rangeObj } from '../renderer/index.mjs'

// 操作数类 
export default class Operands {
  constructor({
    range = rangeObj.range, // range 是范围
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
    this.absDen = Math.abs(this.denominator);   // 取绝对值
    this.absNum = Math.abs(this.numerator);     // 取绝对值
    this.isNegative = this.denominator * this.numerator < 0 ? '-' : '';   // 是否是负数
    let integer = Math.floor(this.absNum / this.absDen); // 假分数前面的整数
    let numerator = this.absNum % this.absDen; // 分子
    let denominator = this.absDen; // 分母
    if (numerator === 0) return this.absNum / denominator; // 是否整除
    let gcdNum = gcd(numerator, denominator); // 求最大公约数
    return `${this.isNegative}${integer === 0 ? '' : `${integer}'`}${numerator / gcdNum}/${denominator / gcdNum}`;
  }

  // 求真正的数值
  toValue() {
    return this.numerator / this.denominator;
  }
}