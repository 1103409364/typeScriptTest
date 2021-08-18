// // 通过工厂函数包裹装饰器，这样可以传递自定义参数
// function testDecorator1(flag: boolean) {
//   if (flag) {
//     return function (constructor: any) {
//       constructor.prototype.getName = () => {
//         console.log(123);
//       };
//       console.log("decorator1");
//     };
//   } else {
//     return function (constructor: any) {
//       console.log("decorator1");
//     };
//   }
// }

// @testDecorator1(false)
// class Test {}

// const test = new Test();

// (test as any).getName();
