// export const router = Router();
import { Method } from './controller';
import { CrowllerController, LoginController } from '../controller';

const METHOD_METADATA = 'method';
const PATH_METADATA = 'path';

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
const createMappingDecorator = (method: Method) => (path: string) => {
  return (target: CrowllerController | LoginController, key: string) => {
    Reflect.defineMetadata(PATH_METADATA, path, target, key);
    Reflect.defineMetadata(METHOD_METADATA, method, target, key);
  };
};

export const get = createMappingDecorator(Method.get); // 注意大小写
export const post = createMappingDecorator(Method.post);
