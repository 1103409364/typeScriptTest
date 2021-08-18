// // 类的装饰器
// // 装饰器本身是一个函数
// // 类装饰器接收的参数是构造函数
// // 装饰器通过 @ 符号使用
// function testDecorator1(constructor: any) {
//   constructor.prototype.getName = () => {
//     console.log(123);
//   };
//   console.log("decorator1");
// }

// function testDecorator2(constructor: any) {
//   console.log("decorator2");
// }

// // 从上到下收集装饰器，执行的时候是从下到上
// @testDecorator1
// @testDecorator2
// class Test {}

// // 装饰器在类定义的时候执行一次，不是实例化的时候执行
// const test = new Test();
// const test1 = new Test();

// (test as any).getName();
