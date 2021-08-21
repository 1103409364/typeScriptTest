/**
 * 参数的装饰器
 * @param target 原型
 * @param method 方法名
 * @param paramIndex 参数位置索引
 */
function paramDecorator(target: any, method: string, paramIndex: number) {
  console.log(target, method, paramIndex);
}

class Test6 {
  getInfo(name: string, @paramDecorator age: number) {
    console.log(name, age);
  }
}

const test6 = new Test6();
test6.getInfo("hello", 11);
