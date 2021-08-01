import express, { Request, Response } from 'express'; // ctrl 点击跳转到dts查看相应的类型
import router from './router';

const app = express();
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
