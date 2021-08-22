import { getResponseData } from '../utils/util';

/**
 * 使用工场函数生产装饰器，传参，实现自定义错误消息
 * @param errorInfo 错误信息
 * @returns
 */
export function catchError(errorInfo: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;
    descriptor.value = function (req: any, res: any, ...rest: any) {
      try {
        fn.call(this, req, res, ...rest);
      } catch (e) {
        // console.log( e);
        res.json(getResponseData({}, errorInfo));
      }
    };
  };
}
