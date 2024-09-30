import {
  HttpInterceptorFn,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Проверяем, доступен ли localStorage
    let token: string | null = null;

    if (typeof window !== 'undefined') {
      token = localStorage.getItem('auth_token');
    }

    // Если токен существует, клонируем запрос и добавляем заголовок Authorization
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Token ${token}`),
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

// export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };
