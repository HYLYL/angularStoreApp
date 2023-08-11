import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { State } from '../store';
import * as fromUi from '../store/ui/ui.actions';
import { selectIsLoggedIn } from '../store/ui/ui.reducer';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  public isLoggedIn!: boolean;

  constructor (private authService: AuthService,
               private router: Router,
               private store: Store<State>
    ) {};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.store.select(selectIsLoggedIn).pipe(
        takeUntil(this.destroy$)
      ).subscribe( value => this.isLoggedIn = value);
    let error;

      console.log(`Auth Guard : ${this.isLoggedIn}`);

    if ( !this.isLoggedIn ) {

      error = { type: 'WARNING', code: 33, msg: 'You need to login' };
      this.router.navigate(['/login']);

    } else {

      error =  { type: 'INFO', code: 30, msg: 'You are logged' };
      
    }

    this.store.dispatch(fromUi.setError({error: error}) );
    return true;
      

  }

  ngOnDestroy() {
    console.log(`ToolbarComponent - ngOnDestroy`);
//émission d'une valeur du subject pour provoquer l'interception des takeUntil
    this.destroy$.next(true);
//libération du subject
    this.destroy$.complete();

  }
  
}
