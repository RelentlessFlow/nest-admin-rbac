// HTTP响应类型
export type HttpResponseType = {
  data: any;
  message: string;
  success: boolean;
  [key: string]: any;
}