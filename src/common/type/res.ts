// HTTP响应类型
export interface HttpResponseType {
  data: any;
  message: string;
  success: boolean;
  [key: string]: any;
}