import 'reflect-metadata';
import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import { controller, use, get, catchError } from '../decorator';
import { getResponseData } from '../utils/util';
import Crowller from '../utils/crowller';
import Analyzer1 from '../utils/analyzer';

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined; // 泛匹配
  };
}

// 登录校验中间件
const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  console.log('checkLogin中间件');
  const isLogin = !!(req.session ? req.session.login : false);
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, '请先登录'));
    // res.send('请先登录');
  }
};

const test = (req: Request, res: Response, next: NextFunction): void => {
  console.log('testMiddleware中间件');
  next();
};

// 编译阶段阶段执行装饰器
@controller('/')
export class CrowllerController {
  @get('/getData')
  @use(checkLogin)
  @use(test)
  getData(req: RequestWithBody, res: Response): void {
    const url = 'https://baidu.com';
    const analyzer = Analyzer1.getInstance();
    new Crowller(analyzer, url);
    res.json(getResponseData(true));
  }

  @get('/showData')
  @use(checkLogin)
  @catchError('数据不存在')
  showData(req: RequestWithBody, res: Response): void {
    // try {
    const position = path.resolve(__dirname, '../../data/imgData.json'); // 文件可能不存在，处理异常
    const result = fs.readFileSync(position, 'utf8');

    res.json(getResponseData(JSON.parse(result)));
    // } catch (e) {
    //   res.json(getResponseData(false, '数据不存在'));
    // }
  }
}
