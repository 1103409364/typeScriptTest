// 定义全局变量，告诉ts $ 是什么
// declare var $: (param: () => void) => void;

// 定义全局函数
// declare function $(param: () => void): void;
// 定义全局函数 函数重载 可以接收不同的参数
// declare function $(param: string): { html: (html: string) => {} };

// 优化前面的代码，定义jq实例
interface JqueryInstance {
  html: (html: string) => JqueryInstance;
}
// 函数重载
declare function $(readyFunction: () => void): void;
declare function $(selector: string): JqueryInstance;

// 用接口interface实现函数重载。既是函数又是对象时，这种方法不支持
// interface JQuery {
//   (readyFunction: () => void): void;
//   (selector: string): JqueryInstance;
// }

// declare var $: JQuery;

// 如何对对象进行类型定义 namespace，如何对类进行类型定义，以及命名空间的嵌套
declare namespace $ {
  namespace fn {
    class init {}
  }
}
