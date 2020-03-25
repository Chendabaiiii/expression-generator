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

// 检查命令行参数的合法性
export const parameterCheck = (mode, param) => {
  // 如果是其他模式则返回错误
  if (['-n', '-r', '-e', '-a'].indexOf(mode) === -1) {
    console.log('参数有误，请重新输入！');
    return false;
  }
  // -n -r 的参数一定得是数字
  if (['-n', '-r'].indexOf(mode) !== -1) {
    if (!(/^\d+$/.test(param))) {
      console.log('参数有误，请重新输入！');
      return false;
    }
  }
  return true;
}