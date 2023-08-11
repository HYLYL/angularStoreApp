import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Reviews } from './reviews';

@Injectable({ providedIn: 'root' })
export class ReviewsService extends EntityCollectionServiceBase<Reviews> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Reviews', serviceElementsFactory);
  }
}
