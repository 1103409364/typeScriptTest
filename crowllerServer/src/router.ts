import { Router, Request, Response } from 'express';
import Crowller from './crowller';
import Analyzer1 from './analyzer';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

router.get('/getData', (req: Request, res: Response) => {
  const url = 'https://baidu.com';
  const analyzer = Analyzer1.getInstance();
  new Crowller(analyzer, url);

  res.send('getData success');
});

export default router;
