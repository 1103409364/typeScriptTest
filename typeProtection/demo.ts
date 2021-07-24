interface Bird {
  fly: boolean;
  sing: () => {};
}

interface Dog {
  fly: boolean;
  bark: () => {};
}
// 联合类型（A|B 竖线分隔） 类型保护
function trainAnimal(animal: Bird | Dog) {
  // animal.sing(); // 报错，ts 不知道是哪种类型
  // if (animal.fly) {
  //   animal.sing(); //报错，ts 不知道有这个方法
  // }

  // 1 通过断言的方式做类型保护
  if (animal.fly) {
    (animal as Bird).sing();
  } else {
    (animal as Dog).bark();
  }
}
// 2 通过 in 语法做类型保护
function trainAnimal2(animal: Bird | Dog) {
  if ("sing" in animal) {
    animal.sing();
  } else {
    animal.bark();
  }
}
//3 typeof
function add(a: string | number, b: string | number) {
  if (typeof a === "string" || typeof b === "string") {
    return `${a} ${b}`;
  }
  return a + b;
}

class NumberObj {
  count: number;
}
// 4 instanceof NumberObj 不能是interface，因为它不支持instanceof
function addSecond(a: object | NumberObj, b: number | NumberObj) {
  if (a instanceof NumberObj && b instanceof NumberObj) {
    return a.count + b.count;
  }
  return 0;
}
