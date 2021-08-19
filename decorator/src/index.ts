// 方法的装饰器
function getNameDecorator(target: any, key: string) {}

class Test {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  @getNameDecorator
  getName() {
    return this.name;
  }
}

const test = new Test("hello world");
console.log(test.getName());
