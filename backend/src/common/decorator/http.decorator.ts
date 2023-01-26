// HTTP控制器自定义装饰器
import { UseInterceptors } from "@nestjs/common";
import { HttpResponseInterceptor } from "../../core/interceptor/http-response.interceptor";
import {HttpResponseType} from "../../../type";

/**
 * 自定义HTTP响应格式，可传入任意参数对象   @HttpResponse({ message: '删除角色成功' })
 * @param options
 * @constructor
 */
export function HttpResponse(options: Omit<HttpResponseType, 'data'>): MethodDecorator {
  return UseInterceptors(new HttpResponseInterceptor(options));
}