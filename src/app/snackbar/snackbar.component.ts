//Angular
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
//Library
import { Observable } from 'rxjs';
//App
import { Error } from '../interfaces/error';
import { State } from '../store';
import * as fromUi from '../store/ui/ui.reducer';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SnackbarComponent implements OnInit {
  public error$!: Observable< Error | null >;
  constructor(
    private store: Store<State>
  ) {};

  ngOnInit() {
    this.error$ = this.store.select(fromUi.selectError);
  }
}
