// ts 直接引用js类库会报错，需要类型定义文件。鼠标移到对应的位置，按提示安装类型定义文件@types/superagent
// ts -> .d.ts类型声明文件 -> js
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import cheerio from 'cheerio';

interface ImgData {
  src: string | undefined;
  time: number;
}

interface Content {
  [propName: number]: ImgData;
}

class Crowller {
  private url = 'https://baidu.com';

  constructor() {
    this.initSpiderProcess();
  }

  async getRawHtml() {
    const res = await superagent.get(this.url);
    return res.text;
    // this.getInfo(res.text);
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const res = this.getInfo(html);
    this.generateJsonContent(res);
  }

  getInfo(rawHtml: string) {
    const $ = cheerio.load(rawHtml);
    const img = $('#s_lg_img');
    return { src: img.attr('src'), time: new Date().getTime() };
    // return { src: img.attr('src'), time: new Date().getTime };
  }

  generateJsonContent(res: ImgData) {
    const filePath = path.resolve(__dirname, '../data/imgData.json');
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      console.log(fileContent);
    }

    fileContent[res.time] = res;
    fs.writeFileSync(filePath, JSON.stringify(fileContent));
  }
}

const crowller = new Crowller();
