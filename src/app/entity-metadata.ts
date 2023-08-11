import { EntityMetadataMap, EntityDataModuleConfig, DefaultDataServiceConfig, EntitySelectors } from '@ngrx/data';
import { MemoizedSelector, MemoizeFn } from '@ngrx/store';
import { Articles } from './store/data/articles';
import { Orders } from './store/data/orders';
import { Reviews } from './store/data/reviews';
import { Users } from './store/data/users';
import { Basket } from './store/data/basket';
import { Clients } from './store/data/clients';

const entityMetadata: EntityMetadataMap = {

  Users: {
    selectId: (user: Users) => user._id
  },
  Articles: {
    selectId: (article: Articles) => article._id
  },
  Reviews: {
    selectId: (review: Reviews) => review._id
  },
  Orders: {
    selectId: (order: Orders) => order._id
  },
  CLients: {
    selectId: (client: Clients) => client._id
  },
  Basket: {
    selectId: (basket: Basket) => basket._id
  }
  
};

const pluralNames = { 
  Users: 'Users',
  Clients: 'clients',
  Articles: 'Articles',
  Reviews: 'Reviews',
  Orders: 'Orders',
  Basket: 'Basket'
 };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://localhost:3000/',
  timeout: 3000, // request timeout
};
