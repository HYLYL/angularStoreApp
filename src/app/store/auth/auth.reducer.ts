//Angular
//Library
import { Action, createReducer, on, select } from '@ngrx/store';
//App
import * as AuthActions from './auth.actions';
import { Data } from 'src/app/interfaces/data';

export const authFeatureKey = 'auth';

export interface State {
  token: Data["token"] | null;
  user: Data["user"];
  loading: boolean;

}

export const initialState: State = {

  token: null,
  user: '',
  loading: false

};

export const reducer = createReducer(

  initialState,
  on( AuthActions.login, ( state: State ) => ( { ...state, loading: true } ) ),

  on( AuthActions.loginSuccess, ( state: State, action ) => ( { 
    ...state, 
    loading: false,
    user: action.user,
    token: action.token
  } ) ),

  on( AuthActions.loginFailure, ( state: State ) => ( {  
    ...state, 
    ...initialState
   } ) ),

  on( AuthActions.logout, ( state: State ) => ( { 
    ...state, 
    ...initialState
  }))

);

export const selectToken = ( state: State ) => state.token;
export const selectUser = ( state: State ) => state.user;
export const selectLoading = ( state: State ) => state.loading;