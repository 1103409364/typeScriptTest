// 方法的装饰器
// 1 普通方法 target 对应的是类的 prototype
// 2 静态方法 target 对应的是类的 构造方法
// 3 第三个参数：属性描述对象PropertyDescriptor
// 类似 Object.defineProperty() 的第三个参数
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
function getNameDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  // descriptor.value = function () {
  //   console.log(123456);
  // };
  descriptor.writable = false;

  console.log(target, key);
}

// function getNameDecorator2(
//   target: any,
//   key: string,
//   descriptor: PropertyDecorator
// ) {
//   console.log(target, key);
// }

class Test {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  @getNameDecorator
  getName() {
    return this.name;
  }

  @getNameDecorator
  static getNumber(): number {
    return 132;
  }
}

const test = new Test("hello world");
test.getName = function () {
  console.log("123");
};
// console.log(test.getName());
console.log(Test.getNumber());
