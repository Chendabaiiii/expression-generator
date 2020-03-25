// 公用函数模块


// 生成 [min, max] 之间的随机数
export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// 辗转相除法求最大公约数
export const gcd = (num1, num2) => {
  let remainder = 0;
  do {
    remainder = num1 % num2;
    num1 = num2;
    num2 = remainder;
  } while (remainder !== 0);
  return num1;
}