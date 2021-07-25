// namespace Components {
//   // 命名空间里可以写interface
//   export interface User {
//     name: string;
//   }
//   // 可以写子命名空间
//   export namespace SubComponents {
//     export class Test {}
//   }

//   export class Header {
//     constructor() {
//       const elem = document.createElement("div");
//       elem.innerHTML = "this is header";
//       document.body.appendChild(elem);
//     }
//   }

//   export class Content {
//     constructor() {
//       const elem = document.createElement("div");
//       elem.innerHTML = "this is content";
//       document.body.appendChild(elem);
//     }
//   }

//   export class Footer {
//     constructor() {
//       const elem = document.createElement("div");
//       elem.innerHTML = "this is footer";
//       document.body.appendChild(elem);
//     }
//   }
// }

// es6 模块化

export class Header {
  constructor() {
    const elem = document.createElement("div");
    elem.innerHTML = "this is header";
    document.body.appendChild(elem);
  }
}

export class Content {
  constructor() {
    const elem = document.createElement("div");
    elem.innerHTML = "this is content";
    document.body.appendChild(elem);
  }
}

export class Footer {
  constructor() {
    const elem = document.createElement("div");
    elem.innerHTML = "this is footer";
    document.body.appendChild(elem);
  }
}
