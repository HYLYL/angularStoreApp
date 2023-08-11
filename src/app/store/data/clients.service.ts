import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Clients } from './clients';

@Injectable({ providedIn: 'root' })
export class UsersService extends EntityCollectionServiceBase<Clients> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Clients', serviceElementsFactory);
  }
}