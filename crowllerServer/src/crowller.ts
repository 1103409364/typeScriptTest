// ts 直接引用js类库会报错，需要类型定义文件。鼠标移到对应的位置，按提示安装类型定义文件@types/superagent
// ts -> .d.ts类型声明文件 -> js
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import Analyzer1 from './analyzer';

// 自定义类型
export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

class Crowller {
  private filePath = path.resolve(__dirname, '../data/imgData.json');
  private url = '';
  constructor(private analyzer: Analyzer, url: string) {
    this.url = url;
    this.initSpiderProcess();
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  private async getRawHtml() {
    const res = await superagent.get(this.url);
    return res.text;
    // this.getInfo(res.text);
  }

  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }
}

export default Crowller;
