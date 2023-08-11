import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Basket } from './basket';

@Injectable({ providedIn: 'root' })
export class EntityBasketService extends EntityCollectionServiceBase<Basket> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Basket', serviceElementsFactory);
  }
}