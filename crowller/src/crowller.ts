// ts 直接引用js类库会报错，需要类型定义文件。鼠标移到对应的位置，按提示安装类型定义文件@types/superagent
// ts -> .d.ts类型声明文件 -> js
import superagent from 'superagent';

class Crowller {
  private url = 'https://baidu.com';
  private rawHtml = '';

  constructor() {
    this.getRawHtml();
  }

  async getRawHtml() {
    const res = await superagent.get(this.url);
    this.rawHtml = res.text;
  }
}

const crowller = new Crowller();
