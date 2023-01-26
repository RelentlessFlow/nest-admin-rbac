// 用于全局响应结果的格式处理
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor
  implements NestInterceptor
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((_data) => {
        const def = { message: 'success', success: true } as Omit<HttpResponseType, 'data'>
        // 处理拦截器增加的字段
        const op = _data._option ?? {}
        delete _data['_option']
        // 如果data中不包含data，则为一般情况，做对象化处理 { data: {} }
        _data = _data.data ? _data : { data: _data }
        // 合并默认参数
        return {
          ...def, ...op, ..._data,
        } as HttpResponseType;
      }),
    );
  }
}

