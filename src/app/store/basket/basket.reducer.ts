//Angular

//Library
import { createReducer, on } from '@ngrx/store';

//App
import * as BasketActions from './basket.actions';

export const basketFeatureKey = 'basket';

export interface State {
  count: number;
}

export const initialState: State = {
  count: 0
};

export const reducer = createReducer(

    initialState,

    on( BasketActions.basketUpdateCount, ( state: State, action ) => ( { 
      ...state, 
      count: action.val
      
    } ) )
  
  );

export const selectCount = ( state: State ) => state.count;