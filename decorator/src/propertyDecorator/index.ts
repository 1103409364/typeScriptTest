/**
 * 属性的装饰器
 * @param target 类的 prototype，实例的原型对象
 * @param key 属性名
 */
function propertyDecorator(target: any, key: string): any {
  // 修改的不是实例的name，而是原型上的name
  target[key] = "hello";

  // const descriptor: PropertyDescriptor = {
  //   writable: false,
  // };

  // return descriptor; //自定义descriptor 替换属性自带的属性描述对象
  // console.log(target, key);
}

class Test5 {
  @propertyDecorator
  name = "Test5";
}

const test5 = new Test5();
test5.name = "Test5xxx";
console.log("test5.name", test5.name);
console.log("Test5.prototype", Test5.prototype);
