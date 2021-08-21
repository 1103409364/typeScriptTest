// 类似 Object.defineProperty() 的第三个参数
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
/**
 * 方法的装饰器
 * @param target 普通方法 target 对应的是类的 prototype，静态方法 target 对应的是类的 构造方法
 * @param key 方法名
 * @param descriptor 属性描述对象PropertyDescriptor
 */
function getNameDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  // descriptor.value = function () {
  //   console.log(123456);
  // };
  // descriptor.writable = false; // 禁止修改

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
  return "123";
};

console.log(test.getName());
// console.log(Test.getNumber());
