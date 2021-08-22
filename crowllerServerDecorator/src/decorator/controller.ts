import router from '../router';
import { RequestHandler } from 'express';
export enum Method {
  get = 'get',
  post = 'post',
}

// export function controller(target: new (...args: any[]) => any) {
//   // 遍历所有原型属性（方法）
//   for (const key in target.prototype) {
//     // 获取原型属性 'path' 上的元数据
//     const path = Reflect.getMetadata('path', target.prototype, key);
//     const method: Method = Reflect.getMetadata('method', target.prototype, key);
//     const handler = target.prototype[key]; //获取Controller 类中的方法
//     const middleware: RequestHandler = Reflect.getMetadata(
//       'middleware',
//       target.prototype,
//       key
//     );
//     // 动态生成路由
//     if (path && method) {
//       if (middleware) {
//         router[method](path, middleware, handler); // 如果有中间件，就带上中间件
//       } else {
//         router[method](path, handler); // 访问path，执行handler
//       }
//     }
//   }
// }

/**
 * 更灵活的路由管理
 * @param root 路由前缀，默认是根路径，url 为 /root/path 才能调用成功
 * @returns
 */
export function controller(root: string = '/') {
  return function (target: new (...args: any[]) => any) {
    // 遍历所有原型属性（方法）
    for (const key in target.prototype) {
      // 获取原型属性 'path' 上的元数据
      const path = Reflect.getMetadata('path', target.prototype, key);
      const method: Method = Reflect.getMetadata(
        'method',
        target.prototype,
        key
      );
      const handler = target.prototype[key]; //获取Controller 类中的方法
      const middleware: RequestHandler = Reflect.getMetadata(
        'middleware',
        target.prototype,
        key
      );
      // 动态生成路由
      if (path && method) {
        const fullPath = '/' === root ? path : `${root}${path}`;
        if (middleware) {
          router[method](fullPath, middleware, handler); // 如果有中间件，就带上中间件
        } else {
          router[method](fullPath, handler); // 访问path，执行handler
        }
      }
    }
  };
}
