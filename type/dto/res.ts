// HTTP响应类型
export type HttpResponseType<T = any> = {
  data: T;
  message: string;
  success: boolean;
  [key: string]: any;
}