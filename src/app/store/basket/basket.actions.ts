//Angular
//Library
import { createAction, props } from '@ngrx/store';
//App

export const basketUpdateCount = createAction(

    '[Basket] Count Update',
    props<{val: number}>()
  
  );