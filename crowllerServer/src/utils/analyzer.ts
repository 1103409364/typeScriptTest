import cheerio from 'cheerio';
import fs from 'fs';
import { Analyzer } from './crowller';

interface ImgData {
  src: string | undefined;
  time: number;
}
interface Content {
  [propName: number]: ImgData;
}

export default class Analyzer1 implements Analyzer {
  private static instance: Analyzer;
  static getInstance() {
    if (!Analyzer1.instance) {
      Analyzer1.instance = new Analyzer1();
    }

    return this.instance;
  }

  private constructor() {}

  private getInfo(rawHtml: string) {
    const $ = cheerio.load(rawHtml);
    const img = $('#s_lg_img');
    return { src: img.attr('src'), time: new Date().getTime() };
    // return { src: img.attr('src'), time: new Date().getTime };
  }

  private generateJsonContent(res: ImgData, filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    fileContent[res.time] = res;
    return fileContent;
  }

  /**
   * analyze
   */
  public analyze(html: string, filePath: string) {
    const courseInfo = this.getInfo(html);
    const fileContent = this.generateJsonContent(courseInfo, filePath);
    return JSON.stringify(fileContent);
  }
}

// 单例模式，不能被外部实例化
// 提供一个静态方法获取实例
