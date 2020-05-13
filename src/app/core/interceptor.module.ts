import { Injectable, NgModule } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUtil } from '../util/login-util';
import { isNullOrUndefined } from 'util';

@Injectable()

export class HttpsRequestInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        const basic = LoginUtil.getAutenticacao();

        if (isNullOrUndefined(basic)) {
            return next.handle(req);
        }

        const dupReq = req.clone({
            headers: req.headers.set('Authorization', 'Basic ' + basic),
        });
        return next.handle(dupReq);
    }
}

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpsRequestInterceptor,
            multi: true,
        },
    ],
})
export class Interceptor { }
