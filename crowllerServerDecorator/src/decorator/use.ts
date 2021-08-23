import { RequestHandler } from 'express';
import { CrowllerController, LoginController } from '../controller';

// use装饰器，把传进来的函数注册为中间件
// 中间件一般是 RequestHandler类型
export function use(middleware: RequestHandler) {
  return function (target: CrowllerController | LoginController, key: string) {
    const originMiddleware =
      Reflect.getMetadata('middleware', target, key) || [];
    originMiddleware.push(middleware);
    // 参数1：key，参数2：value，参数3：保存位置，参数4保存的属性名
    Reflect.defineMetadata('middleware', originMiddleware, target, key);
  };
}
