// class Header {
//   constructor() {
//     const elem = document.createElement("div");
//     elem.innerHTML = "this is header";
//     document.body.appendChild(elem);
//   }
// }

// class Content {
//   constructor() {
//     const elem = document.createElement("div");
//     elem.innerHTML = "this is content";
//     document.body.appendChild(elem);
//   }
// }

// class Footer {
//   constructor() {
//     const elem = document.createElement("div");
//     elem.innerHTML = "this is footer";
//     document.body.appendChild(elem);
//   }
// }

// class Page {
//   constructor() {
//     new Header();
//     new Content();
//     new Footer();
//   }
// }

// 问题：编译后类名是全局变量，过多的全局变量让项目不可维护。只有Page需要变成全局变量
// 解决：使用命名空间。
// 原理：使用IIFE创建的作用域实现命名空间
// namespace Home {
//   class Header {
//     constructor() {
//       const elem = document.createElement("div");
//       elem.innerHTML = "this is header";
//       document.body.appendChild(elem);
//     }
//   }

//   class Content {
//     constructor() {
//       const elem = document.createElement("div");
//       elem.innerHTML = "this is content";
//       document.body.appendChild(elem);
//     }
//   }

//   class Footer {
//     constructor() {
//       const elem = document.createElement("div");
//       elem.innerHTML = "this is footer";
//       document.body.appendChild(elem);
//     }
//   }
//   // 使用export把Page暴露出去
//   export class Page {
//     constructor() {
//       new Header();
//       new Content();
//       new Footer();
//     }
//   }
// }

// 拆解Components

// 依赖相互引用声明
// /// <reference path='./components.ts' />

// namespace Home {
//   export class Page {
//     constructor() {
//       new Components.Header();
//       new Components.Content();
//       new Components.Footer();
//       // Components.SubComponents.Test // 访问子命名空间
//     }
//   }
// }

//  import对应的模块化。编译后是amd规范的代码（在tsconfig中配置的）
// 浏览器不支持adm，需要引入require.js才能支持amd规范的代码。或者使用webpack打包
import { Header, Content, Footer } from "./components";

export default class Page {
  constructor() {
    new Header();
    new Content();
    new Footer();
  }
}
