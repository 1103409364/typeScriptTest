import 'reflect-metadata';
import { Request, Response } from 'express';
import { controller, get, post } from '../decorator';
import { getResponseData } from '../utils/util';

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined; // 泛匹配
  };
}

// 编译阶段阶段执行装饰器
@controller('/')
export class LoginController {
  // constructor() {}
  static isLogin(req: Request): boolean {
    return !!(req.session ? req.session.login : false);
  }

  @post('/login')
  login(req: RequestWithBody, res: Response): void {
    const { password } = req.body; // body undefined，需要解析中间件body-parser。ts没有错误提示 express类型声明文件中req是any类型
    // 这里的 password 是any类型，改d.ts没有意义
    const isLogin = LoginController.isLogin(req); // !!(req.session ? req.session.login : false);

    if (isLogin) {
      res.json(getResponseData(false, '已经登录过'));
    } else {
      if (password === '123') {
        if (req.session) {
          req.session.login = true;
          res.json(getResponseData(true));
        } else {
          res.json(getResponseData(false, '登录失败'));
        }
      } else {
        // res.send('登录失败');
        res.json(getResponseData(false, '登录失败'));
      }
    }
  }

  @get('/logout')
  logout(req: Request, res: Response): void {
    if (req.session) {
      req.session.login = undefined;
    }
    // res.redirect('/');
    res.json(getResponseData(true));
  }

  @get('/')
  home(req: Request, res: Response) {
    // const isLogin = !!(req.session ? req.session.login : false);
    const isLogin = LoginController.isLogin(req);
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
  }
}
