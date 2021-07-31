interface Person {
  name: string;
  age: number;
  gender: string;
}

class Teacher {
  constructor(private info: Person) {}
  getInfo<T extends keyof Person>(key: T): Person[T] {
    // key可能是这三个属性，加if判断类型保护。
    // if (key === "name" || key === "age" || key === "gender") {
    //   return this.info[key];
    // }

    // 另一种方式，使用泛型keyof。原理，type可以是字符串
    // type T = 'name'
    // key: 'name';
    // Person['name'];
    // type T = 'age'
    // key: 'age';
    // Person['age'];
    // 遍历...

    return this.info[key];
  }
}

const teacher = new Teacher({
  name: "小明",
  age: 1,
  gender: "mal",
});

const test = teacher.getInfo("name");
//const test: string | number | undefined 类型推断不准确。可以使用as string断言
// const test: string 使用keyof之后，类型推断更准确
console.log(test);
