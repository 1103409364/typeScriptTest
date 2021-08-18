// (test as any).getName(); 之前的例子存在问题，类被装饰器装饰后，实例方法调用报错

function testDecorator1<T extends new (...args: any[]) => {}>(constructor: T) {
  // constructor.prototype.getName = () => {
  //   console.log(123);
  // };
  return class extends constructor {
    name = "111";
    getName() {
      return this.name;
    }
  };
}

// @testDecorator1
class Test {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const test = new Test("222");
// test.getName(); //依然报错，无法识别装饰器添加的方法

console.log(test);

// 换一种方式使用装饰器
function testDecoratorFactory() {
  return function testDecorator1<T extends new (...args: any[]) => {}>(
    constructor: T
  ) {
    return class extends constructor {
      name = "testDecoratorFactory";
      getName() {
        return this.name;
      }
    };
  };
}

const Test2 = testDecoratorFactory()(
  class {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
);

const test2 = new Test2("333");
console.log(test2.getName()); // 可以识别getName了
