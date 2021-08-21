// 装饰器的应用
const userInfo: any = undefined;

/**
 * 异常捕获装饰器 实现代码复用。问题：无法自定义错误提示
 * @param target
 * @param key
 * @param descriptor
 */
function catchError(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
): void {
  const fn = descriptor.value;
  descriptor.value = function () {
    try {
      fn();
    } catch (e) {
      console.log("userInfo 存在问题");
    }
  };
}

/**
 * 使用工场函数生产装饰器，传参，实现自定义错误消息
 * @param errorInfo 错误信息
 * @returns
 */
function catchErrorFactory(errorInfo: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;
    descriptor.value = function () {
      try {
        fn();
      } catch (e) {
        console.log(errorInfo);
      }
    };
  };
}

class Test7 {
  @catchErrorFactory("属性name不存在")
  // @catchError
  getName() {
    // try {
    return userInfo.name;
    // } catch (e) {
    //   // console.log("user name" + "不存在");
    // }
  }

  @catchError
  getAge() {
    // try {
    return userInfo.age;
    // } catch (e) {
    //   console.log("user name" + "不存在"); // 每次都要 try catch
    // }
  }
}

const test7 = new Test7();
test7.getName();
test7.getAge();
