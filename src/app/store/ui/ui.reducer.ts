//Angular

//Library
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';

//App
import { Error } from '../../interfaces/error';
import * as UiActions from './ui.actions';

export const uiFeatureKey = 'ui';

export interface Filter {
  gender: string;
};

export interface Articles {
  page: number;
  limit: number;
  filter: Filter | null;
  count: number;
};

export interface State {
  
    error: Error | null;
    articles: Articles;
    isLoggedIn: boolean;
    currentUser: string | null;
  
  };

export const initialState: State = {

  error: null,

  articles: {
    page: 0,
    limit: 12,
    filter: null,
    count: 0
  },

  isLoggedIn: false,

  currentUser: null

};

export const reducer = createReducer(

    initialState,

    on( UiActions.setError, ( state: State, action ) => ( { 
      ...state, 
      error: action.error
    } ) ),

    on( UiActions.setArticlesPage, ( state: State, page ) => ( { 
      ...state, 
      articles: {
        ...state.articles,
        ...page
      }
    } ) ),

    on( UiActions.resetArticlesPage, ( state: State ) => ( { 
      ...state, 
      articles: {
        ...state.articles,
        page: 0
      }
    } ) ),

    on( UiActions.setArticlesLimit, ( state: State, limit ) => ( { 
      ...state, 
      articles: {
        ...state.articles,
        ...limit
      }
    } ) ),

    on( UiActions.setArticlesFilter, ( state: State, filter ) => ( { 
      ...state, 
      articles: {
        ...state.articles,
        ...filter
      }
    } ) ),

    on( UiActions.resetArticlesFilter, ( state: State ) => ( { 
      ...state, 
      articles: {
        ...state.articles,
        filter: null
      }
    } ) ),

    on( UiActions.setArticlesCount, ( state: State, count ) => ({
      ...state,
      articles: {
        ...state.articles,
        ...count
      }
    })),

    on( UiActions.setIsLoggedIn, ( state: State, isLoggedIn ) => ({
      ...state,
      ...isLoggedIn
    })),

    on( UiActions.setCurrentUser, ( state: State, currentUser ) => ({
      ...state,
      ...currentUser
    }))
  
  );

export const selectUi = createFeatureSelector< State >( uiFeatureKey );
  
export const selectError = createSelector(
  selectUi,
  ( state: State ) => state.error
);

export const selectArticles = createSelector(
  selectUi,
  ( state: State ) => state.articles
);

export const selectIsLoggedIn = createSelector(
  selectUi,
  ( state: State ) => state.isLoggedIn
);

export const selectCurrentUser = createSelector(
  selectUi,
  ( state: State ) => state.currentUser
);

export const selectArticlesPage = createSelector(
  selectArticles,
  ( state: Articles) => state.page
);

export const selectArticlesLimit = createSelector(
  selectArticles,
  ( state: Articles) => state.limit
);

export const selectArticlesFilter = createSelector(
  selectArticles,
  ( state: Articles) => state.filter
);

export const selectArticlesCount = createSelector(
  selectArticles,
  ( state: Articles ) => state.count
);