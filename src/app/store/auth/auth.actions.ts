//Angular
//Library
import { createAction, props } from '@ngrx/store';
//App
import { Credentials } from '../../interfaces/credentials';
import { Data } from '../../interfaces/data';

export const login = createAction(

  '[Auth] Login',
  props< { login: string, pswd: string } >()

);

export const loginSuccess = createAction(

  '[Auth] Login Success',
  props<Data>()

);

export const loginFailure = createAction(

  '[Auth] Login Failure'

  
);

export const logout = createAction(
  
  '[Auth] Logout'
  
);

export const setError = createAction(

  '[Auth] Set Error',
  props<{ error: any }>()
  
);