// ES6模块化
declare module "jquery" {
  interface JqueryInstance {
    html: (html: string) => JqueryInstance;
  }
  // 混合类型
  declare function $(readyFunction: () => void): void;
  declare function $(selector: string): JqueryInstance;
  declare namespace $ {
    namespace fn {
      class init {}
    }
  }
  // 导出需要用到的东西
  export = $;
}
