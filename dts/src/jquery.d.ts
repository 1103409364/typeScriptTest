// 定义全局变量，告诉ts $ 是什么
// declare var $: (param: () => void) => void;

// 定义全局函数
// declare function $(param: () => void): void;
// 定义全局函数 函数重载 可以接收不同的参数
// declare function $(param: string): { html: (html: string) => {} };

// 优化前面的代码，定义jq实例
interface JqueryInstance {
  html: (html: string) => {};
}

declare function $(readyFunction: () => void): void;
declare function $(selector: string): JqueryInstance;
