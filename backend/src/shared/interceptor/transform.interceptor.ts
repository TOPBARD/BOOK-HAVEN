import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(_: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((response) => {
        if (response && typeof response === 'object' && 'toJSON' in response) {
          // If it's a Mongoose model, convert it to a plain JavaScript object
          const plainObject = response.toJSON();

          // Check if the plain object has a 'password' field
          if (plainObject && 'password' in plainObject) {
            // Omit the 'password' field from the response
            const { password, ...rest } = plainObject;
            return { ...rest };
          }
        }

        return response;
      }),
    );
  }
}
