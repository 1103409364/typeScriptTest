import { Router, RequestHandler } from 'express';

export const router = Router();
const METHOD_METADATA = 'method';
const PATH_METADATA = 'path';
import { getResponseData } from '../utils/util';

enum Method {
  get = 'get',
  post = 'post',
}

/**
 * 使用工场函数生产装饰器，传参，实现自定义错误消息
 * @param errorInfo 错误信息
 * @returns
 */
export function catchErrorFactory(errorInfo: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;
    descriptor.value = function (req: any, res: any) {
      try {
        fn();
      } catch (e) {
        res.json(getResponseData({}, errorInfo));
      }
    };
  };
}

export function controller(target: any) {
  // 遍历所有原型属性（方法）
  for (const key in target.prototype) {
    // 获取原型属性 'path' 上的元数据
    const path = Reflect.getMetadata('path', target.prototype, key);
    const method: Method = Reflect.getMetadata('method', target.prototype, key);
    const handler = target.prototype[key]; //获取Controller 类中的方法
    const middleware = Reflect.getMetadata('middleware', target.prototype, key);
    // 动态生成路由
    if (path && method && handler) {
      if (middleware) {
        router[method](path, middleware, handler); // 如果有中间件，就带上中间件
      } else {
        router[method](path, handler); // 访问path，执行handler
      }
    }
  }
}

// use装饰器，把传进来的函数注册为中间件
// 中间件一般是 RequestHandler类型
export function use(middleware: RequestHandler) {
  return function (target: any, key: string) {
    // 参数1：key，参数2：value，参数3：保存位置，参数4保存的属性名
    Reflect.defineMetadata('middleware', middleware, target, key);
  };
}

// export function get(path: string) {
//   return function (target: any, key: string) {
//     // 控制反转和依赖注入
//     // https://jkchao.github.io/typescript-book-chinese/tips/metadata.html#%E8%8E%B7%E5%8F%96%E7%B1%BB%E5%9E%8B%E4%BF%A1%E6%81%AF
//     // 在类的原型属性 'path' 上定义元数据，key 为 `path`，value 为 path
//     Reflect.defineMetadata('path', path, target, key);
//     Reflect.defineMetadata('method', path, target, key);
//   };
// }

// 定义工厂生成各种方法的装饰器
const createMappingDecorator = (method: string) => (path: string) => {
  return (target: any, key: string) => {
    Reflect.defineMetadata(PATH_METADATA, path, target, key);
    Reflect.defineMetadata(METHOD_METADATA, method, target, key);
  };
};

export const get = createMappingDecorator('get'); // 注意大小写
export const post = createMappingDecorator('post');
