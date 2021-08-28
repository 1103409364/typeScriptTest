// 规范返回结果
interface Result<T> {
  success: boolean;
  errMsg?: string;
  data: any;
}

export const getResponseData = <T>(data: any, errMsg?: string): Result<T> => {
  if (errMsg) {
    return {
      success: false,
      errMsg,
      data,
    };
  }
  return { success: true, data };
};
