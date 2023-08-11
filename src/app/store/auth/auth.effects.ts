// //Angular
// import { Injectable } from '@angular/core';
// //Library
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, EMPTY, exhaustMap, map, of, switchMap } from 'rxjs';
// //App
// import { AuthService } from '../../services/auth.service';
// import { Error } from '../../interfaces/error';

// export const loginError: Error = {
//   type: 'ERROR',
//   code: 99,
//   msg: 'login error'
// };

// export const logoutMsg: Error = {
//   type: 'INFO',
//   code: 0,
//   msg: 'logout success'
// };

// @Injectable()

// export class AuthEffects {

//  private login$ = createEffect(() => this.actions$.pipe(
//   ofType('[Auth] Login'),
//   exhaustMap( ( action: any ) =>  {
//     console.log('login action:', action);
//     return this.auth.login( action ); 
//   }),
  
//   switchMap( ( res: any ) => {
//     console.log('login response:', res);
    
//     return ( res.error.code == 0 ) 
//     ? [{ type: '[Auth] Login Success', user: res.user, token: res.token }, { type: '[Ui] Set Ui Error', error: res.error }]
//     : [{ type: '[Auth] Login Failure' }, { type: '[Ui] Set Ui Error', error: res.error }]
      
//     }
    
//   ),

//   catchError(() => of( { type: '[Auth] Login Failure' },
//                        { type: '[Ui] Set Ui Error', error: loginError } 
//                     ) 
//             )
  
//  ))

//  private logout$ = createEffect(() => this.actions$.pipe(

//   ofType('[Auth] Logout'),
//   map( () => ({ type: '[Ui] Set Ui Error', error: logoutMsg }) )

//  ))

// constructor( private actions$: Actions,     
//              private auth: AuthService ) {}
// }
