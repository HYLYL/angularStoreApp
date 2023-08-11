//Angular
import { Injectable } from '@angular/core';
//Library
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
//App
import { Error } from '../../interfaces/error';

const error: Error = { 
    type: 'INFO',
    code: 99,
    msg: 'Basket Updated'
};

@Injectable()

export class BasketEffects {

 private basketCount$ = createEffect(() => this.actions$.pipe(

  ofType('[Basket] Count Update'),
  map( () => ({ type: '[Ui] Set Ui Error', error: error  }))
 ))

constructor( private actions$: Actions ) {}
}