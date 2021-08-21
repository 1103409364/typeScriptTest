/**
 * get set 访问器的装饰器 参数和方法的参数一样
 * @param target
 * @param key
 * @param descriptor
 */
function setDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  // descriptor.writable = false; //报错 访问器的属性描述对象不能修改
  // get set 不能使用同一个装饰器

  console.log(target, key);
}

class Test4 {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  @setDecorator
  set name(name: string) {
    this._name = name;
  }
}

const test4 = new Test4("test4");

console.log(test4.name);
