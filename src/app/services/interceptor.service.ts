//Angular
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

//Library
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

//App
import * as UiActions from '../store/ui/ui.actions';
import { State } from '../store';
import { AuthService } from './auth.service';

@Injectable()

export class ResponseInterceptor implements HttpInterceptor {

    constructor(private store: Store<State>, 
                private authService: AuthService ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
   
    // console.log(`ResponseInterceptor - intercept : ${request.urlWithParams}`);
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          // console.log([`ResponseInterceptor - intercept : `, event]);

          const xTotalCount = event.headers.get('x-total-count'); // Get the x-total-count header
          const articlesUrl = event.url;

          if ( request.url === 'http://localhost:3000/login' || request.url === 'http://localhost:3000/register' ) {

            this.authService.setToken( event.body.accessToken, 60 * 60 * 1000 );
            const userId = event.body.user._id;
            
            console.log(`User ID: ${userId}`);
            
            }

          if (xTotalCount && articlesUrl) {

            // console.log(articlesUrl.split('/'));
            const urlParts = articlesUrl.split('/');
            const xTotalCountInt = parseInt(xTotalCount);

            // if (request.method === 'POST' && urlParts[3] === 'login' ) {

            //   localStorage.setItem('token', xAuthToken);
            //   const token = localStorage.getItem('token');
            //    console.log(token);
    
            //   }

            switch (urlParts[3]) {

                case 'articles':
                    // console.log('This is a article request, count: ' + xTotalCountInt);
                    this.store.dispatch(UiActions.setArticlesCount( {count: xTotalCountInt} ));
                    break;

                case 'orders':
                    console.log('This is a order request');
                    break;
                
                case 'users':
                    console.log('This is a user request');
                    break;

                case 'login':
                  // localStorage.setItem('token', xAuthToken);
                  // const token = localStorage.getItem('token');
                  break;

                default:
                    console.log('This is a request for a different type of resource');
            }
          } else { 
            // console.log('No count or url'); 
          }
        }
      })
    );
  }
}