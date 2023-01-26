// HTTP响应格式拦截处理
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import {HttpResponseType} from "typelibrary";

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
  constructor(private options: Omit<HttpResponseType, 'data'>) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map(data => {
        return { ...data, _option: this.options }
      }));
  }
}