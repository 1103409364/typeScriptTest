import express, { NextFunction, Request, Response } from 'express'; // ctrl 点击跳转到dts查看相应的类型
import bodyParser from 'body-parser';
import router from './router';
// express 等老的非ts 写的框架会有这些问题：
// 问题 1: express 库的类型定义文件.d.ts 文件类型描述不准确
// 通过自定义一个interface 继承之前的类型，进行扩展。来解决

// 问题 2: 当我使用中间件的时候，对req 或者res 做了修改之后呢，实际上类型并不能跟着改变，用到req res的时候会报错
// 通过类型融合方式解决，custom.d.ts 参考express的类型声明文件写一个类型声明，添加需要的类型
// 点击Request -  express-serve-static-core -

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// 中间件修改req
app.use((req: Request, res: Response, next: NextFunction) => {
  req.test = '中间件'; // Property 'teacherName1' does not exist on type
  next();
});
app.use(router);

// 路由多的时候，把相关代码独立到路由文件router.ts中
// app.get('/', (req: Request, res: Response) => {
//   res.send('hello world');
// });

// app.get('/getData', (req: Request, res: Response) => {
//   res.send('hello world getData');
// });

app.listen(8080, () => {
  console.log('server listening on port 8080');
});
