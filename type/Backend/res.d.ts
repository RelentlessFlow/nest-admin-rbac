// HTTP响应类型
declare type HttpResponseType = {
  data: any;
  message: string;
  success: boolean;
  [key: string]: any;
}