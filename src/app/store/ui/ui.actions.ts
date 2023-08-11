//Angular
//Library
import { createAction, props } from '@ngrx/store';
//App
import { Error } from '../../interfaces/error';
import { Filter } from './ui.reducer';

export const setError = createAction(

    '[Ui] Set Error',
    props<{ error: any }>()
  
);

export const setArticlesPage = createAction(
  '[Ui] Set Articles Page',
  props<{ page: number}>()
);

export const resetArticlesPage = createAction(
  '[Ui] Reset Articles Page'
);

export const setArticlesLimit = createAction(
  '[Ui] Set Articles Limit',
  props<{ limit: number}>()
);

export const setArticlesFilter = createAction(
  '[Ui] Set Articles Filter',
  props<{ filter: Filter}>()
);

export const resetArticlesFilter = createAction(
  '[Ui] Reset Articles Filter'
);

export const setArticlesCount = createAction(
  '[Ui] Set Articles Count',
  props<{ count: number }>()
);

export const setIsLoggedIn = createAction(
  '[Ui] Set Logged In',
  props<{ isLoggedIn: boolean }>()
);

export const setCurrentUser = createAction(
  '[Ui] Set Current User',
  props<{ currentUser: string | null }>()
);