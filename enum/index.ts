// const Status = {
//   OFFLINE: 0,
//   ONLINE: 1,
//   DELETED: 2,
// };

enum Status {
  OFFLINE,
  ONLINE = 2, //可以手动设置枚举成员的初始值，后续成员的值自动递增
  DELETED,
} // 默认是 012，

console.log(Status.OFFLINE, Status.ONLINE, Status.DELETED); //正查
console.log(Status[0], Status[1], Status[2]); //反查枚举成员

function getResult(status: number) {
  if (status === Status.OFFLINE) {
    return "offline";
  } else if (status === Status.ONLINE) {
    return "online";
  } else if (status === Status.DELETED) {
    return "deleted";
  }

  return "error";
}

console.log(getResult(1));
