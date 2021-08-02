import { Router, Request, Response } from 'express';
import Crowller from './crowller';
import Analyzer1 from './analyzer';

const router = Router();

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined; // 泛匹配
  };
}

router.get('/', (req: Request, res: Response) => {
  res.send(`
  <html>
    <body>
      <form method="post" action="/getData">
        <input type="password" name="password" />
        <button>提交</button>
      </form>
    </body>
  </html>
  `);
});

router.post('/getData', (req: RequestWithBody, res: Response) => {
  const { password } = req.body; // body undefined，需要解析中间件body-parser。ts没有错误提示 express类型声明文件中req是any类型
  // 这里的 password 是any类型，改d.ts没有意义

  if (password === '123') {
    const url = 'https://baidu.com';
    const analyzer = Analyzer1.getInstance();
    new Crowller(analyzer, url);

    res.send('getData success');
  } else {
    res.send(req.test + 'password Error!');
  }
});

export default router;
