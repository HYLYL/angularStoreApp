//Angular
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
//Library
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { v4 as uuid } from 'uuid';
//App
import { AuthService } from './services/auth.service';
import { selectIsLoggedIn, selectError } from './store/ui/ui.reducer';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { State } from './store';
import * as fromUi from './store/ui/ui.actions';

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class AppComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject();
  private durationInSeconds: number;

  public count: number;
  public isLoggedIn$!: Observable<boolean>;
  public title: string;

  constructor( 
    private snackBar: MatSnackBar,
    private store: Store<State> ){
    this.title = 'AngularApp';
    this.count = 0;
    this.durationInSeconds = 5;

    const guestToken = uuid();
    const guestId = localStorage.getItem('guestToken');
    if (!guestId) {
      localStorage.setItem('guestToken', guestToken);
    };
  }

  ngOnInit() {
    console.log('AppComponent - ngOnInit');

    this.store.select( selectError )
      .pipe( takeUntil( this.destroy$ ) )
      .subscribe( error => {
        if( !!error ) this.openSnackBar();
      })
      ;
    this.store.dispatch(fromUi.setError ({error:{type: 'INFO', code: 55, msg:'application started'}}));
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  
  public basketCount(count: number){
    this.count = count;
  }

  public openSnackBar() {
    this.snackBar.openFromComponent( SnackbarComponent, {

      duration: this.durationInSeconds * 1000,

    });
    
  }

};
