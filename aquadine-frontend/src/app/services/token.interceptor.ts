import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, of } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

  const idToken = localStorage.getItem("id_token");

  if (idToken) {
    const cloned = req.clone({
        headers: req.headers.set("Authorization",
            "Bearer " + idToken)
    });

    return next.handle(cloned);
  }
  else {
    return next.handle(req);
  }
  }
}