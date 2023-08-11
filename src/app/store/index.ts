// Angular
import { isDevMode } from '@angular/core';

//Library
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

//App
import * as fromAuth from './auth/auth.reducer';
import * as fromBasket from './basket/basket.reducer';
import * as fromUi from './ui/ui.reducer';

export interface State {

  [fromAuth.authFeatureKey]: fromAuth.State;
  [fromBasket.basketFeatureKey]: fromBasket.State;
  [fromUi.uiFeatureKey]: fromUi.State;

};

export const reducers: ActionReducerMap<State> = {

  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [fromBasket.basketFeatureKey]: fromBasket.reducer,
  [fromUi.uiFeatureKey]: fromUi.reducer
  
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

// Auth Features

export const selectAuth = ( state: State ) => state[fromAuth.authFeatureKey];

export const selectAuthToken = createSelector(
  selectAuth,
  fromAuth.selectToken
);

export const selectAuthUser = createSelector(
  selectAuth,
  fromAuth.selectUser
);

export const selectAuthLoading = createSelector(
  selectAuth,
  fromAuth.selectLoading
);

// Basket Features

export const selectBasket = ( state: State ) => state[fromBasket.basketFeatureKey];

export const selectBasketCount = createSelector(

  selectBasket,
  fromBasket.selectCount
  
);
