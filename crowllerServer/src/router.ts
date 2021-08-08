import { Router, Request, Response, NextFunction } from 'express';
import { getResponseData } from './utils/util';
import Crowller from './utils/crowller';
import Analyzer1 from './utils/analyzer';
import fs from 'fs';
import path from 'path';

// 登录校验中间件
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, '请先登录'));
    // res.send('请先登录');
  }
};

const router = Router();

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined; // 泛匹配
  };
}

router.get('/', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false;

  if (isLogin) {
    res.send(`
    <html>
      <body>
        <div> <a href="/getData">爬取内容</a> </div>
        <div> <a href="/showData">查看内容内容</a> </div>
        <div> <a href="/logout">退出</a> </div>
      </body>
    </html>
    `);
  } else {
    res.send(`
    <html>
      <body>
        <form method="post" action="/login">
          <input type="password" name="password" />
          <button>登录</button>
        </form>
      </body>
    </html>
    `);
  }
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { password } = req.body; // body undefined，需要解析中间件body-parser。ts没有错误提示 express类型声明文件中req是any类型
  // 这里的 password 是any类型，改d.ts没有意义
  const isLogin = req.session ? req.session.login : false;

  if (isLogin) {
    // res.send('已经登录');
    // res.redirect('/');
    res.json(getResponseData(false, '已经登录过'));
  } else {
    if (password === '123') {
      if (req.session) {
        req.session.login = true;
        // res.send('登录成功');
        // res.redirect('/');
        res.json(getResponseData(true));
      } else {
        res.json(getResponseData(false, '登录失败'));
        // res.send('登录失败');
      }
      // const url = 'https://baidu.com';
      // const analyzer = Analyzer1.getInstance();
      // new Crowller(analyzer, url);

      // res.send('getData success');
    } else {
      // res.send('登录失败');
      res.json(getResponseData(false, '登录失败'));
    }
  }
});

router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }
  // res.redirect('/');
  res.json(getResponseData(true));
});

router.get('/getData', checkLogin, (req: RequestWithBody, res: Response) => {
  // const { password } = req.body; // body undefined，需要解析中间件body-parser。ts没有错误提示 express类型声明文件中req是any类型
  // 这里的 password 是any类型，改d.ts没有意义

  // const isLogin = req.session ? req.session.login : false; // 改为登录方式验证
  // if (isLogin) {
  const url = 'https://baidu.com';
  const analyzer = Analyzer1.getInstance();
  new Crowller(analyzer, url);
  res.json(getResponseData(true));
  // res.send('getData success');
  // } else {
  //   res.send('请先登录');
  //   // res.send(req.test + 'password Error!');
  // }
});

router.get('/showData', checkLogin, (req: RequestWithBody, res: Response) => {
  // const isLogin = req.session ? req.session.login : false; // 改为登录方式验证
  // if (isLogin) {
  try {
    const position = path.resolve(__dirname, '../data/imgData.json'); // 文件可能不存在，处理异常
    const result = fs.readFileSync(position, 'utf8');

    // res.json(JSON.parse(result));
    res.json(getResponseData(JSON.parse(result)));
  } catch (e) {
    // res.send('尚未爬取到内容' + e);
    res.json(getResponseData(false, '数据不存在'));
  }
  // } else {
  //   res.send('请先登录');
  // }
});

export default router;
