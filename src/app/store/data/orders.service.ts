import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Orders } from './orders';

@Injectable({ providedIn: 'root' })
export class OrdersService extends EntityCollectionServiceBase<Orders> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Orders', serviceElementsFactory);
  }
}
