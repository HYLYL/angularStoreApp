// Angular
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

//Library
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

//App
import { Router } from '@angular/router';
import { selectBasketCount, State } from '../store';
import { selectIsLoggedIn } from '../store/ui/ui.reducer';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToolbarComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  
  public basket$!: Observable< number >;
  public isLoggedIn$!: Observable<boolean>;
  
  constructor(private store: Store<State>,
              private router: Router) {
                console.log(`ToolbarComponent - constructor`);
                this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
              }

  ngOnInit() {
    console.log(`ToolbarComponent - ngOnInit`);
    this.basket$ = this.store.select(selectBasketCount);
    
  }

  ngOnDestroy() {
    console.log(`ToolbarComponent - ngOnDestroy`);
//émission d'une valeur du subject pour provoquer l'interception des takeUntil
    this.destroy$.next(true);
//libération du subject
    this.destroy$.complete();

  }

  public login(): void {
    console.log(`ToolbarComponent - login`);

    this.router.navigate(['/login']);
    
  }
}
