import { AuthService } from '../services/auth.service';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { selectIsLoggedIn } from '../store/ui/ui.reducer';
import { State } from '../store';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isLoggedIn!: boolean;

  constructor(
              private authService: AuthService,
              private store: Store<State>
    ) {
      this.store.select(selectIsLoggedIn).subscribe( value => this.isLoggedIn = value );
    }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
  
    // console.log(`AuthInterceptor - intercept : ${request.urlWithParams}`);
    if (this.isLoggedIn) {

        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.authService.getToken()}`
          }
        });

      }
    
    return next.handle(request);
  }
}