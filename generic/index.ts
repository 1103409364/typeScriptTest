// function join(a: string | number, b: string | number) {
//   return `${a}${b}`;
// }

// 需求：限制a、b类型必须一致
// 函数接收一个类型，参数限制为这个类型。函数执行时动态接收一个类型
// function join<T>(a: T, b: T) {
//   return `${a}${b}`;
// }
// 指定多个泛型
function join<T, P>(a: T, b: P) {
  return `${a}${b}`;
}

console.log(join<string, number>("111", 11));
console.log(join(false, 1)); // 泛型自动推断

// params: T[]等价于 params:Array<T>
function map<T>(params: T[]) {
  return params;
}

console.log(map<string>(["1"]));

// 类中的泛型
// 需求：存不同的数据类型需要写很长的联合类型，使用泛型可以解决这个问题
// class DataManager {
//   constructor(private data: string[] | number[]) {}
//   getItem(index: number): string | number {
//     return this.data[index];
//   }
// }

// interface Item {
//   name: string;
// }
// // 泛型支持继承
// class DataManager<T extends Item> {
//   constructor(private data: T[]) {}
//   getItem(index: number): T {
//     return this.data[index];
//   }
// }

// const data = new DataManager([{ name: "小明" }]);

interface Item {
  name: string;
}

// 泛型支持继承
class DataManager<T extends number | string> {
  constructor(private data: T[]) {}
  getItem(index: number): T {
    return this.data[index];
  }
}

const data = new DataManager<number>([1]);

// 泛型类型 把泛型作为类型注解
function hello<T>(params: T) {
  return params;
}

// :后是函数的注解，要求函数支持泛型
const func: <T>(params: T) => T = hello;
